import Home from "./Home";

// props ({key-value})
// ㄴ 자식 요소가 부모에게 전달하는 정보(값)

function MyComponent({messege}) {
    return (
        <>
            <h1>Hello world</h1>
            <p>{messege}</p>
            <Home style={{
                "color":"red",
                "backgroundColor":"black",
                "height":"60px",
                "width":"200px",
                "border":"none",
                "borderRadius":"10px",
                "cursor":"pointer"
            }}/>
        </>
    );
}

// const MyComponent = () => {

// }

export default MyComponent;