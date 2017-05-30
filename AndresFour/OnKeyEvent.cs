using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public abstract class OnKeyEvent : GameObject
    {
        public bool WasLastFrame = false;
#pragma warning disable CS0108 // Member hides inherited member; missing new keyword
        public List<int> Keys;
#pragma warning restore CS0108 // Member hides inherited member; missing new keyword

        public override void Save(dynamic dynamic)
        {
            dynamic.keys = Keys.ToArray();
            base.Save((object)dynamic);
        }

        public override Task Parse(dynamic dynamic)
        {
            Keys = new List<int>((int[])dynamic.keys);
            return base.Parse((object)dynamic);
        }
    }
}
