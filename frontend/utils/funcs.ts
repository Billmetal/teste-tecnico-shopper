export function requiredFields(fields: any[]) {
    let msgs = [];

    fields.map((item: { value: string; name: any }) => {
        if (!item.value || item.value.trim() === "") {
            msgs.push(item.name);
        }
    });

    if (msgs.length > 0) {
        return false;
    } else {
        return true;
    }
}
