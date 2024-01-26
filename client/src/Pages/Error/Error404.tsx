function Error404() {
    return (
        <div className="flex h-screen items-center justify-center">

            <div className="text-center">

                <h1 className="text-9xl font-bold mb-4">404</h1>

                <p className="text-5xl mb-8">Page not found</p>

                <p className="text-xl">Sorry, the page you're looking for doesn't exist.</p>

                <button className="mt-8 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">

                    <a href="/" className="text-white no-underline">

                        Back to Home

                    </a>

                </button>

            </div>

        </div>
    )
}
export default Error404