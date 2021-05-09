import { HorizontalVideoCard } from "../../components";
import { useUserData } from "../../context/userdata-context";

export default function Liked() {
  const { liked } = useUserData();

  return (
    <div>
      <>
        <h2 className="mt-5 mb-2 pl-3">Liked</h2>
        <div>
          {liked.map((video, idx) => (
            <HorizontalVideoCard key={idx} videoDetails={video} />
          ))}
        </div>
      </>
    </div>
  );
}
