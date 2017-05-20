using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class Character : RealGameObject
    {
        public List<Movement> movements;

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
