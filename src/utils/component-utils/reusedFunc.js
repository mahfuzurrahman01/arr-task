'use client'

import { fetchData } from "../GetDataFunc";

export const getData = async (name) => {
    const result = await fetchData(name);
    console.log("result from reused", result);
    return result;
}

export const getRefinedFeatureList = (data, arr) => {
    // ========== set to store ================
    const planTitle = data?.title;
    const planText = data?.text;
    const refinedTitle = planTitle.replace(/<\/?strong>/g, '');
    // ========== new body for the feature =========
    const newBody = {
        is_pro: '1',
        feature_title: refinedTitle,
        feature_desc: planText,
    }
    const newArr = [newBody, ...arr];
    return newArr;
}