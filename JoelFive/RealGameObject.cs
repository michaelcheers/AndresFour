using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class RealGameObject : DrawnGameObject
    {
        public int Gravity;

        public async Task Parse2 (dynamic @dynamic)
        {
            Gravity = @dynamic.gravity;
            await Parse1(@dynamic);
        }
        public virtual void Update (Game @in)
        {
            List<RealGameObject> intersects = new List<RealGameObject>();
            foreach (var child in @in.Children)
            {
                if (child is RealGameObject)
                {
                    var realGameObject = child.As<RealGameObject>();
                    bool doesIntersect = new Rectangle
                    {
                        X = X,
                        Width = Width,
                        Y = Y + Height,
                        Height = Gravity
                    }.Intersects(realGameObject.Position);
                    if (doesIntersect)
                        intersects.Add(realGameObject);
                }
            }
            if (intersects.Count == 0)
                Y += Gravity;
            else
            {
                double min = intersects.Min(v => v.Y - Height);
                Y = min;
            }
        }
    }
}
