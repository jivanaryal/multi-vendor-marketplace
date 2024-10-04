type FieldName = 'email' | 'password';

export const LoginFormField: {
    labelName: string;
    name: FieldName;
    type: string;
    placeholder: string;

}[] = [
        {
        labelName: "email",
        name: "email",
        type: "email",
            placeholder:"eg:jivan@gmail.com"
    },
        {
        labelName: "password",
        name: "password",
        type: "password",
            placeholder:"enter password"
    },
]