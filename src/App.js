// JSX
//ㄴ Javasvript XML

import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Grid } from "@chakra-ui/react";

function App() {
  return (
    <Grid p={"40px 20px"} gap={"10px"} minH={"100vh"} templateRows={"120px auto 160px"}>
      <RouterProvider router={router} />
    </Grid>
  );
}

export default App;
