﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Movement : OnKeyEvent
    {
        public Vector2 Velocity;
        public const string Type = "movement";

        public override void Save(dynamic dynamic)
        {
            dynamic.x = Velocity.X;
            dynamic.y = Velocity.Y;
            base.Save((object)dynamic);
        }

        public override Task Parse(dynamic dynamic)
        {
            Velocity.X = dynamic.x;
            Velocity.Y = dynamic.y;
            return base.Parse((object)dynamic);
        }
    }
}
