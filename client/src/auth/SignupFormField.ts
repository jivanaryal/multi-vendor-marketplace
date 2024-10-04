

type FieldName = 'fullname' | 'email' | 'password';


export const SignupFormField: {
    labelName: string;
    name: FieldName;
    type: string;
    placeholder: string;

}[] = [
    {
        labelName: "full name",
        name: "fullname",  // must match one of the IFormInput keys
        type: "text",
        placeholder: "eg:jivan aryal"
    },
    {
        labelName: "email",
        name: "email",  // must match IFormInput key
        type: "email",
        placeholder: "eg:jivan@gmail.com"
    },
    {
        labelName: "password",
        name: "password",  // must match IFormInput key
        type: "password",
        placeholder: "enter password"
    },
]

