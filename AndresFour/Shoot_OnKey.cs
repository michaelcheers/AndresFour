using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Shoot_OnKey : OnKeyEvent
    {
        public const string Type = "shoot on key";
        public dynamic CreateShot;

        public override Task Parse(dynamic dynamic)
        {
            CreateShot = dynamic.shot;
            return base.Parse((object)dynamic);
        }

        public override void Save(dynamic dynamic)
        {
            dynamic.shot = CreateShot;
            base.Save((object)dynamic);
        }
    }
}
