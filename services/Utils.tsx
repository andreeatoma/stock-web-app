export const formatDate = (dateToFormat: number): string => {
    //  Convert a string like 'Jan 05 2021' into '2021-01-05'
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    let date = new Date(dateToFormat);
    let monthIndex = date.getMonth();
    let str = `${date.getFullYear()}-${months[monthIndex]}-${date.getDate()}`;
    return str;
  };
