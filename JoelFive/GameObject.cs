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
        public static async Task<GameObject> Parse (dynamic @dynamic)
        {
            GameObject result = null;
            string type = @dynamic.type;
            switch (type)
            {
                case "real game object":
                    RealGameObject realGameObject = new RealGameObject();
                    await realGameObject.Parse(realGameObject, @dynamic);
                    result = realGameObject;
                    break;
                case "drawn game object":
                    DrawnGameObject drawnGameObject = new DrawnGameObject();
                    await drawnGameObject.Parse(drawnGameObject, @dynamic);
                    result = drawnGameObject;
                    break;
            }
            return result;
        }
    }
}
