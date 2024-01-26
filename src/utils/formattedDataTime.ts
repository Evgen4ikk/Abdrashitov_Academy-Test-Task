interface FormattedDateTime {
    month: string;
    day: string;
    formattedTime: string;
}

function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export function formatDateTime(dateTimeString: string): FormattedDateTime {
    const dateTime = new Date(dateTimeString);

    const monthNames = [
        "янв", "фев", "март", "апр",
        "мая", "июня", "июля", "авг",
        "сен", "окт", "ноя", "дек"
    ];
    const month = monthNames[dateTime.getMonth()];

    const day = padZero(dateTime.getDate());

    const formattedTime = `${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}`;

    return {
        month,
        day,
        formattedTime
    };
}

