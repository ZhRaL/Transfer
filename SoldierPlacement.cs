

public class ItemSO : TODOO
{
    public Soldier[] soldiers;

    public Transform routeParent1,routeParent2,routeParent3

    private void Start() {
        foreach(Solder soldier in soldiers) {
            Transform parent = getBrancheParent(soldier);
            Tuple<int,Routingpoint> tuple =getRandomPoint(parent);
            Routingpoint point = tuple.Item2;
            soldier.Transform.position = point.Transform.position;
            soldier.targetIndex = tuple.Item1;
        }
    }

    private Transform getBrancheParent(Soldier soldier) {
        switch(soldier.DefenseType) {
            case ARMY => return routeParent1;
            case AIRFORCE => return routeParent2;
            case MARINE => return routeParent3;
            case default => throw new ArgumentException("No valid DefenseType found!!");
        }
    }

    private Tuple<int,RoutingPoint> getRandomPoint(Transform parent) {
        int randomValue = Mathf.Random(0,parent.childCount);
        return parent.getChild(randomValue);
    }

}