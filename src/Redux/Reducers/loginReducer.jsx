const initialState = {
    loginData: {
        email: "",
        password: "",
    },
    regData: {
        fname: "",
        lname: "",
        email: "",
        password: "",
        confirmpass: "",
    },
    reg: false,
    loader: false
}

const LoginReducer = (state = initialState, action) => {

    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
            }
        case "ADD_USER":
            return {
                ...state,
                reg: action.payload
            }
        case "SET_LOADER": {
            return {
                ...state,
                loader: action.payload
            }
        }
        default:
            return state;
    }

}
export default LoginReducer