export default function extractErrors(messages) {
    const errors = {};
    for (let i = 0; i < messages.length; i++) {
        const errorName = messages[i].split(' ')[0].toLowerCase();
        errors[errorName] = messages[i];
    }

    console.log(errors);
    return errors;
}