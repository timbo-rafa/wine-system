
export function brDate(data) {
    // dd/mm/yyyy or dd-mm-yyyy
    const brDateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{4})$/;

    const splitDate = data.match(brDateRegex);

    if (splitDate  === null) throw new Error("data invalida: " + data);
    return new Date(splitDate[3], parseInt(splitDate[2]) - 1, splitDate[1]);
}