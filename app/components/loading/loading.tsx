interface CommonLoadingScreenProps {
  type?: "spinner" | "text";
}
const CommonLoadingScreen = ({
  type = "spinner",
}: CommonLoadingScreenProps) => {
  if (type === "spinner") {
    return <div className="fullscreen flexCenter">SPINNER</div>;
  } else if (type === "text") {
    return <div className="fullscreen flexCenter">CUSTOM LOADING...</div>;
  }
};

export default CommonLoadingScreen;
