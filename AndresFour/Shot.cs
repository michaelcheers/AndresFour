using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Shot : RealGameObject
    {
        public int Corrosivity;
        public new const string Type = "shot";

        public override Task Parse(dynamic dynamic)
        {
            Velocity += new Vector2
            {
                X = dynamic.vX,
                Y = dynamic.vY
            };
            Corrosivity = dynamic.corrosivity;
            return base.Parse((object)dynamic);
        }

        public override void Save(dynamic dynamic)
        {
            dynamic.vX = X;
            dynamic.vY = Y;
            dynamic.corrosivity = Corrosivity;
            base.Save((object)dynamic);
        }

        public void Corrode (Level @in)
        {
            foreach (RealGameObject intersect in lastIntersects)
                if (intersect.Strength <= Corrosivity)
                    @in.Children.Remove(intersect);
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
            base.Update(@in);
        }
    }
}
