import Loading from "@/Component/loading"
import makeApi, { uploadFileRequest } from "@/Lib/makeApi"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { ChangeEvent, useEffect, useState } from "react"

interface Cab {
    _id: string;
    name: string;
    baserate: number;
    carnumber: string;
    image: string;
    maxpac: number,
    parkm: number;
    isAllow: boolean;
    date: string; // You might want to use a Date type here if you're parsing it as a Date object
    __v: number;
}

function ManageCabs() {
    const [load, setLoad] = useState<number>(0)
    const [showAddCab, setshowAddCab] = useState<boolean>(false)

    const [data, setData] = useState<null | Cab[]>(null);
    const loadData = async () => {
        try {
            const allcabs = await makeApi({ path: "/api/cabs" })
            setData(allcabs.data);
        } catch (error) {
            setData([])
        }
    }

    useEffect(() => {
        loadData();
    }, [load])

    const reloadData = () => {
        setLoad(prev => prev + 1);
    }


    const deleteCab = async (id: string) => {
        console.log(id);
        const urlPath = "/api/admin/cab/" + id;
        try {
            await makeApi({ path: urlPath, isAdmin: true, method: "DELETE" })
            reloadData();
        } catch (error) {
            console.log(error);

            alert("Delete Record Field")
        };
    };

    return (
        <>
            <div className="flex sm:gap-10 px-5 sm:px-20 mt-10 justify-between items-center w-full"> <h1 className="text-lg font-bold" >Manage Your All Cabs</h1>
                <AddCabs reloadData={reloadData} showAdd={showAddCab} showAddCab={setshowAddCab} /></div>
            {data == null ? <Loading /> : data.length == 0 ? <div className="flex justify-center items-center h-96">No Cabs Found</div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10 px-5 sm:px-20 mt-10  mb-32">
                {
                    data.map((e, i) => {
                        return <Card >
                            <CardHeader className="flex flex-row justify-between w-full items-center">
                                <div>
                                    <CardTitle>{e.carnumber}</CardTitle>
                                    <CardDescription>{e.name}</CardDescription>
                                </div>
                                <img src={import.meta.env.VITE_APIURL + "/" + e.image} alt="car" className="object-contain w-20 h-20 " />
                            </CardHeader>
                            <CardContent>
                                <p>1/KM Price : ₹{e.parkm}.0</p>
                                <p>Base Price : ₹{e.baserate}.0</p>
                                <p>Max Passenger : {e.maxpac}</p>
                            </CardContent>
                            <CardFooter className="flex float-end">
                                <UpdateCabs id={e._id} data={{ name: e.name, baserate: e.baserate, carnumber: e.carnumber, image: e.image, maxpac: e.maxpac, parkm: e.maxpac }} reloadData={reloadData} />
                                <AlertDialog>
                                    <AlertDialogTrigger>    <Button className="bg-red-600 hover:bg-red-900">Delete</Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure wan to delete?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Deleting this item will permanently remove it from your records.
                                                This action cannot be undone. Proceed with caution.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteCab(e._id)} className="bg-red-700 hover:bg-red-900">Delete Now</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>


                            </CardFooter>
                        </Card>
                    })
                }



            </div>}
        </>
    )
}
export default ManageCabs

interface CabData {
    image: string;
    name: string;
    carnumber: string;
    parkm: number;
    baserate: number;
    maxpac: number;
}

function AddCabs({ reloadData, showAddCab, showAdd }: { reloadData: Function, showAddCab: Function, showAdd: boolean }) {

    const [imageLoading, setImageLoading] = useState<boolean>(false)
    const [cabData, setCabData] = useState<CabData>({
        image: '',
        name: '',
        carnumber: '',
        parkm: 50,
        baserate: 200,
        maxpac: 4,
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const uploadAfile = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (fileInput.files && fileInput.files[0]) {
            const selectedFile = fileInput.files[0];
            try {
                setImageLoading(true)
                const uploadNew = await uploadFileRequest(selectedFile, {});
                setImageLoading(false)

                setCabData({
                    ...cabData,
                    image: uploadNew.filename,
                });
                setValidationErrors({
                    ...validationErrors,
                    image: '', // Reset validation error when the user types
                });
            } catch (error) {
                setImageLoading(false)

                alert("Image Upload Field")
            }
        }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCabData({
            ...cabData,
            [name]: value,
        });
        setValidationErrors({
            ...validationErrors,
            [name]: '', // Reset validation error when the user types
        });
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        // Example validation: Check if required fields are empty
        if (!cabData.image.trim()) {
            errors.image = 'Cab Image Is required';
        }
        if (!cabData.name.trim()) {
            errors.name = 'Cab Model Name is required';
        }

        if (!cabData.carnumber.trim()) {
            errors.carnumber = 'Cab Id Number is required';
        }

        if (cabData.parkm <= 0) {
            errors.kmprice = '1/KM Price must be greater than zero';
        }

        if (cabData.baserate <= 0) {
            errors.baserate = 'Base Rate Amount must be greater than zero';
        }

        if (cabData.maxpac <= 0) {
            errors.maxpac = 'Max Passenger Capacity must be greater than zero';
        }

        setValidationErrors(errors);

        // Return true if there are no errors, indicating the form is valid
        return Object.keys(errors).length === 0;
    };

    const handleAddCab = async () => {
        if (validateForm()) {
            try {
                toast({
                    title: "Adding..",
                    description: "Adding New Cab",
                })
                const addCabData = await makeApi({ path: "/api/admin/addcab", data: cabData, method: "POST", isAdmin: true });
                console.log(addCabData);
                toast({
                    title: "Successful",
                    description: "New Cab Upload Successfully",
                });
                setCabData({
                    image: '',
                    name: '',
                    carnumber: '',
                    parkm: 50,
                    baserate: 200,
                    maxpac: 4,
                })
                reloadData();
                showAddCab(false);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "New Cab Added Field",
                })
            }
        } else {
            console.log('Form is invalid. Please fix the errors.');
        }
    };

    return (
        <Dialog open={showAdd} onOpenChange={(e) => showAddCab(e)} >
            <DialogTrigger  >Add New Cab</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Cab</DialogTitle>
                    <DialogDescription>
                        Enter New Cab Info
                    </DialogDescription>
                </DialogHeader>


                <div className="mb-1">
                    <Label>Cab Image</Label>
                    <Input type="file" name="image" onChange={uploadAfile} />
                    {!imageLoading ? null : <div className="text-yellow-600 text-sm">Uploading...</div>}
                    {validationErrors.image && <div className="text-red-600 text-sm">{validationErrors.image}</div>}

                </div>

                <div className="mb-1">
                    <Label>Cab Model Name</Label>
                    <Input type="text" name="name" value={cabData.name} onChange={handleInputChange} />
                    {validationErrors.name && <div className="text-red-600 text-sm">{validationErrors.name}</div>}
                </div>

                <div className="mb-1">
                    <Label>Cab Id Number</Label>
                    <Input type="text" name="carnumber" value={cabData.carnumber} onChange={handleInputChange} />
                    {validationErrors.carnumber && <div className="text-red-600 text-sm">{validationErrors.carnumber}</div>}
                </div>

                <div className="mb-1">
                    <Label>1/KM Price</Label>
                    <Input type="number" min={1} name="parkm" value={cabData.parkm} onChange={handleInputChange} />
                    {validationErrors.kmprice && <div className="text-red-600 text-sm">{validationErrors.kmprice}</div>}
                </div>

                <div className="mb-1">
                    <Label>Base Rate Amount</Label>
                    <Input type="number" min={1} name="baserate" value={cabData.baserate} onChange={handleInputChange} />
                    {validationErrors.baserate && <div className="text-red-600 text-sm">{validationErrors.baserate}</div>}
                </div>

                <div className="mb-1">
                    <Label>Max Passenger Capacity</Label>
                    <Input type="number" min={1} name="maxpac" value={cabData.maxpac} onChange={handleInputChange} />
                    {validationErrors.maxpac && <div className="text-red-600 text-sm">{validationErrors.maxpac}</div>}
                </div>

                <Button type="button" onClick={handleAddCab}>
                    Add Cab
                </Button>

            </DialogContent>

        </Dialog>

    )
}

function UpdateCabs({ id, data, reloadData, }: { id: string, data: CabData, reloadData: Function }) {

    const [imageLoading, setImageLoading] = useState<boolean>(false)
    const [showUpdate, setshowUpdate] = useState<boolean>(false)



    const [cabData, setCabData] = useState<CabData>(data);

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const uploadAfile = async (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;

        if (fileInput.files && fileInput.files[0]) {
            const selectedFile = fileInput.files[0];
            try {
                setImageLoading(true)
                const uploadNew = await uploadFileRequest(selectedFile, {});
                setImageLoading(false)

                setCabData({
                    ...cabData,
                    image: uploadNew.filename,
                });
                setValidationErrors({
                    ...validationErrors,
                    image: '', // Reset validation error when the user types
                });
            } catch (error) {
                setImageLoading(false)

                alert("Image Upload Field")
            }
        }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCabData({
            ...cabData,
            [name]: value,
        });
        setValidationErrors({
            ...validationErrors,
            [name]: '', // Reset validation error when the user types
        });
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        // Example validation: Check if required fields are empty
        if (!cabData.image.trim()) {
            errors.image = 'Cab Image Is required';
        }
        if (!cabData.name.trim()) {
            errors.name = 'Cab Model Name is required';
        }

        if (!cabData.carnumber.trim()) {
            errors.carnumber = 'Cab Id Number is required';
        }

        if (cabData.parkm <= 0) {
            errors.kmprice = '1/KM Price must be greater than zero';
        }

        if (cabData.baserate <= 0) {
            errors.baserate = 'Base Rate Amount must be greater than zero';
        }

        if (cabData.maxpac <= 0) {
            errors.maxpac = 'Max Passenger Capacity must be greater than zero';
        }

        setValidationErrors(errors);

        // Return true if there are no errors, indicating the form is valid
        return Object.keys(errors).length === 0;
    };

    const handleAddCab = async () => {
        if (validateForm()) {
            try {
                toast({
                    title: "Updating..",
                    description: "Updating New Cab",
                })
                const addCabData = await makeApi({ path: "/api/admin/cab/" + id, data: cabData, method: "PUT", isAdmin: true });
                console.log(addCabData);
                setshowUpdate(false)
                toast({
                    title: "Successful",
                    description: "Cab Update Successfully",
                });
                reloadData();
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Cab Update Field",
                })
            }
        } else {
            console.log('Form is invalid. Please fix the errors.');
        }
    };

    return (
        <Dialog open={showUpdate} onOpenChange={(e) => setshowUpdate(e)} >
            <DialogTrigger  ><Button className="mr-2" >Update</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Cab</DialogTitle>
                    <DialogDescription>
                        Enter Update Cab Info
                    </DialogDescription>
                </DialogHeader>


                <div className="mb-1">
                    <Label>Cab Image</Label>
                    <Input type="file" name="image" onChange={uploadAfile} />
                    {!imageLoading ? null : <div className="text-yellow-600 text-sm">Uploading...</div>}
                    {validationErrors.image && <div className="text-red-600 text-sm">{validationErrors.image}</div>}
                </div>

                <div className="mb-1">
                    <Label>Cab Model Name</Label>
                    <Input type="text" name="name" value={cabData.name} onChange={handleInputChange} />
                    {validationErrors.name && <div className="text-red-600 text-sm">{validationErrors.name}</div>}
                </div>

                <div className="mb-1">
                    <Label>Cab Id Number</Label>
                    <Input type="text" name="carnumber" value={cabData.carnumber} onChange={handleInputChange} />
                    {validationErrors.carnumber && <div className="text-red-600 text-sm">{validationErrors.carnumber}</div>}
                </div>

                <div className="mb-1">
                    <Label>1/KM Price</Label>
                    <Input type="number" min={1} name="parkm" value={cabData.parkm} onChange={handleInputChange} />
                    {validationErrors.kmprice && <div className="text-red-600 text-sm">{validationErrors.kmprice}</div>}
                </div>

                <div className="mb-1">
                    <Label>Base Rate Amount</Label>
                    <Input type="number" min={1} name="baserate" value={cabData.baserate} onChange={handleInputChange} />
                    {validationErrors.baserate && <div className="text-red-600 text-sm">{validationErrors.baserate}</div>}
                </div>

                <div className="mb-1">
                    <Label>Max Passenger Capacity</Label>
                    <Input type="number" min={1} name="maxpac" value={cabData.maxpac} onChange={handleInputChange} />
                    {validationErrors.maxpac && <div className="text-red-600 text-sm">{validationErrors.maxpac}</div>}
                </div>

                <Button type="button" onClick={handleAddCab}>
                    Update Cab Data
                </Button>

            </DialogContent>

        </Dialog>

    )
}
