import org.firstinspires.ftc.vision.VisionPortal;
import org.firstinspires.ftc.robotcore.external.hardware.camera.WebcamName;
import org.opencv.core.Size;

BallDetectorPipeline baller = new BallDetectorPipeline();

VisionPortal portal = new VisionPortal.Builder()
        .setCamera(hardwareMap.get(WebcamName.class, "Webcam 1"))
        .setCameraResolution(new Size(1280, 720))
        .addProcessor(baller)
        .enableLiveView(true)
        .build();