// ================== this function will return the Package details, according to the params ======================
export const fetchData = async (packageName) => {
    console.log(packageName)
    try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        const refineData = data?.plans?.filter(item => item?.name == packageName);
        return refineData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
// ================== this function will return the package plansInfo for billing toggle  ======================
export const fetchPlansInfo = async () => {

    try {
        const response = await fetch('/api/packages');
        const data = await response.json();
      
        return data?.plansInfo;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// ================== this function will return the package features with the help of params (0, 1) ==============================

export const fetchPlansFeature = async (selector) => {

    try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        const refineData = data?.features?.filter(item => item?.is_pro == selector);
        return refineData;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};