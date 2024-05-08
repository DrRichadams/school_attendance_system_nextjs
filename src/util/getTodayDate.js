export const GetTodayDate = () => {
    let now_date = new Date();
    let now_day = now_date.getDate();
    let now_month = now_date.getMonth();
    let now_year = now_date.getFullYear();
    return  `${now_day}/${now_month}/${now_year}`;
}