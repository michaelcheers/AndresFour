using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Shot : DrawnGameObject
    {
        public Vector2 Velocity;
        public new const string Type = "shot";

        public override Task Parse(dynamic dynamic)
        {
            Velocity = new Vector2
            {
                X = dynamic.vX,
                Y = dynamic.vY
            };
            return base.Parse((object)dynamic);
        }

        public override void Save(dynamic dynamic)
        {
            dynamic.vX = X;
            dynamic.vY = Y;
            base.Save((object)dynamic);
        }

        public override void Update(Level @in)
        {
            if (!(new Rectangle
            {
                X = 0,
                Y = 0,
                Width = @in.Width,
                Height = @in.Height
            }.Contains(new Vector2
            {
                X = Position.X,
                Y = Position.Y
            })))
                @in.Children.Remove(this);
            X += Velocity.X;
            Y += Velocity.Y;
            base.Update(@in);
        }
    }
}
