using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class GameObject
    {
        public static async Task<GameObject> Create (dynamic @dynamic)
        {
            GameObject result = null;
            string type = @dynamic.type;
            switch (type)
            {
                case "character":
                    Character character = new Character();
                    await character.Parse(@dynamic);
                    result = character;
                    break;
                case "real game object":
                    RealGameObject realGameObject = new RealGameObject();
                    await realGameObject.Parse(@dynamic);
                    result = realGameObject;
                    break;
                case "drawn game object":
                    DrawnGameObject drawnGameObject = new DrawnGameObject();
                    await drawnGameObject.Parse(@dynamic);
                    result = drawnGameObject;
                    break;
            }
            return result;
        }
    }
}
