export const fetchData = async (packageName) => {
    console.log(packageName)
    try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        const refineData = data?.plans?.find(item => item?.name == packageName);
        return refineData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
export const fetchPlansInfo = async () => {

    try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        console.log(data)
        return data?.plansInfo;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};