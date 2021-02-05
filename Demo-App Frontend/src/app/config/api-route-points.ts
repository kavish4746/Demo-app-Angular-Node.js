import { url } from '../../environments/environment';

export const apiRoutes = {
    User: {
        USER_OPERATION: `${url.endPoint}/user`,
        UPDATE_WITH_IMG:`${url.endPoint}/userUpdateWithImg/`,
        ADD_USER_WITH_DEFAULT_IMG:`${url.endPoint}/addnewUserWithoutIMG/`
    }
}