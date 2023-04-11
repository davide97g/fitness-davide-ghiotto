import { Button } from "antd";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h3>Home</h3>
      <Button type="primary" onClick={() => navigate("/weight")}>
        Weight Tracker
      </Button>
    </>
  );
}
