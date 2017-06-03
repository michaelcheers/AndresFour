using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public abstract class GameObject
    {
        public string Name;
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async virtual Task Parse (dynamic @dynamic)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {

        }
        public virtual void Save (dynamic @dynamic)
        {
            @dynamic.name = Name;
        }
        public override dynamic ToDynamic ()
        {
            dynamic result = Script.ToPlainObject(new
            {
                type = GetType().GetField("Type").GetValue(null).As<string>()
            });
            Save(result);
            return result;
        }
        public virtual void Update(Level @in) { }
        public static async Task<GameObject> Create (dynamic @dynamic)
        {
            GameObject result = null;
            string type = @dynamic.type;
            Type fromType = null;
            foreach (var a in typeof(GameObject).Assembly.GetTypes())
            {
                if (a.IsAbstract)
                    continue;
                var iter = a;
                bool goA, dBreak = false;
                do
                {
                    goA = false;
                    if (iter.BaseType == typeof(GameObject))
                        if ((string)a.GetField("Type").GetValue(null) == type)
                        {
                            fromType = a;
                            dBreak = true;
#pragma warning disable CS0642 // Possible mistaken empty statement
                        }
                        else;
#pragma warning restore CS0642 // Possible mistaken empty statement
                    else if (iter.BaseType != typeof(object))
                    {
                        iter = iter.BaseType;
                        goA = true;
                    }
                }
                while (goA);
                if (dBreak)
                    break;
            }
            if (fromType == null)
                throw new Exception($"Unknown type: {type}");
            await (result = (GameObject)fromType.GetConstructor(new Type[] { }).Invoke()).Parse(@dynamic);
            if (@dynamic.name != null)
                result.Name = @dynamic.name;
            return result;
        }
    }
}
