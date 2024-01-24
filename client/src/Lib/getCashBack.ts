export const getCashBack = (purchaseAmount: number, cashbackPercentage: number) => {
    return (purchaseAmount * cashbackPercentage) / 100;
}