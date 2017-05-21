using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public abstract class GameObject
    {
        public string Name;
        public virtual void Save (dynamic @dynamic)
        {
            @dynamic.name = Name;
        }
        public virtual void AddKeys (Dictionary<string, string> addTo)
        {
            addTo.Add("Name", "Name");
        }
        public override dynamic ToDynamic ()
        {
            dynamic result = new object();
            string type;
            if (this is Character)
                type = Character.Type;
            else if (this is RealGameObject)
                type = RealGameObject.Type;
            else if (this is DrawnGameObject)
                type = DrawnGameObject.Type;
            else
                throw new Exception($"Invalid type: {GetType()}");
            result.type = type;
            Save(result);
            return result;
        }
        public static async Task<GameObject> Create (dynamic @dynamic)
        {
            GameObject result = null;
            string type = @dynamic.type;
            switch (type)
            {
                case Character.Type:
                    Character character = new Character();
                    await character.Parse(@dynamic);
                    result = character;
                    break;
                case RealGameObject.Type:
                    RealGameObject realGameObject = new RealGameObject();
                    await realGameObject.Parse(@dynamic);
                    result = realGameObject;
                    break;
                case DrawnGameObject.Type:
                    DrawnGameObject drawnGameObject = new DrawnGameObject();
                    await drawnGameObject.Parse(@dynamic);
                    result = drawnGameObject;
                    break;
            }
            if (@dynamic.name != null)
                result.Name = @dynamic.name;
            return result;
        }
    }
}
