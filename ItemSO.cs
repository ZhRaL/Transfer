[CreateAssetMenu("UpdateItemSO")]
public class ItemSO : ScriptableObject
{
    private DataProvider dataProvider;
    public UpgradeDto upgradeDto {
        get {
            dataProvider = GameManager.INSTANCE.GetDataProvider();

            upgradeDto = new UpgradeDto(
                // ... TODO
            );
        }
        private set{}
    };
    public ObjDefType objDefType;
    public string itemName;
    public string description;
    public Sprite icon;
    public Image iconBackground;

    private int Level;
    private int cost; 
    private int reward;
    private int rewardDiff;
}