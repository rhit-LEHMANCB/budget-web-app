import {FC} from "react";
import {Button} from "@mui/material";

export const Home: FC = () => {
    return (<Button onClick={() => window.open('./login')}>Login</Button>);
}