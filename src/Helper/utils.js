export const mapDispatchToProps = (dispatch) => {
    return {
        setData: (val) => {
            dispatch({ type: val.action, payload: val.payload })
        }
    };
};