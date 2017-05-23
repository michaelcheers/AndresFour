using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Character : RealGameObject
    {
        public new const string Type = "character";
        public List<Movement> movements;

        public override void Save(dynamic dynamic)
        {
            dynamic.movements = movements.ConvertAll(v => Script.ToPlainObject(new
            {
                keys = v.Keys.ToArray(),
                x = v.Velocity.X,
                y = v.Velocity.Y
            })).ToArray();
            base.Save((object)dynamic);
        }

        public override void Update (Game @in)
        {
            base.Update(@in);
            if (onSolid)
                foreach (var movement in movements)
                    if (movement.Keys.All(key => @in.Down.Contains(key)))
                    {
                        TryMove(@in, movement.Velocity);
                        break;
                    }
        }

        public override async Task Parse (dynamic @dynamic)
        {
            movements = new List<Movement>();
            foreach (var movementDynamic in @dynamic.movements)
            {
                Movement movement = new Movement
                {
                    Velocity = new Vector2
                    {
                        X = movementDynamic.x,
                        Y = movementDynamic.y
                    },
                    Keys = ((int[])movementDynamic.keys).ToList()
                };
                movements.Add(movement);
            }
            await base.Parse((object)@dynamic);
        }
    }
}
