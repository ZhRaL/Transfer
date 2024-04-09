[Header("Low Zoom Level")]
public Vector2 Local_Low_X, Local_Low_Z;
public Vector2 World_Low_X, World_Low_Z;

[Header("High Zoom Level")]
public Vector2 Local_High_X, Local_High_Z;
public Vector2 World_High_X, World_High_Z;

var zoomDelta = maxDistanceZoomOut - minDistanceZoomIn;
var zoomLerper = (currentZoom - minDistanceZoomIn) /zoomDelta;

// Here Insertion!!
private void moveCamTarget(){
    var tempTargetPos=null;

    targetPosition = checkLocal(tempTargetPos);
    var tempWorld = localTransform.TransformVector(targetPosition);

    tempWorld = checkWorld(tempWorld);
    var transformed = localTransform.InverseTransformVector(tempWorld);
}

private Vector3 checkLocal(Vector3 vec) {
    var borderX = GetValue(CameraValues.LOCAL_X);
    var borderY = GetValue(CameraValues.LOCAL_Z);
    
    return new Vector3(Within(vec.x,borderX),
                        vec.y,
                        Within(vec.z,borderY));
}

private void checkWorld() {
    var borderX = GetValue(CameraValues.WORLD_X);
    var borderY = GetValue(CameraValues.WORLD_Z);
    
    return new Vector3(Within(vec.x,borderX),
                        vec.y,
                        Within(vec.z,borderY));
}

private float Within(float value, Vector2 borders) {
    return Between(value,borders.x,borders.y);
}

private Vector2 GetValue(CameraValues type) {
    return type switch{
        CameraValues.LOCAL_X => Vector2.Lerp(Local_Low_X, Local_High_X, zoomLerper);
        CameraValues.LOCAL_Z => Vector2.Lerp(Local_Low_Z, Local_High_Z, zoomLerper);

        CameraValues.WORLD_X => Vector2.Lerp(World_Low_X, World_High_X, zoomLerper);
        CameraValues.WORLD_Z => Vector2.Lerp(World_Low_Z, World_High_Z, zoomLerper);
    }
}

public enum CameraValues {
    LOCAL_X,LOCAL_Z,WORLD_X,WORLD_Z
}