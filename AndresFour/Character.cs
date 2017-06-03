using Bridge;
using Bridge.Html5;
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
        public List<OnKeyEvent> keyEvents;

        public override void Save(dynamic dynamic)
        {
            dynamic.keyEvents = keyEvents.ConvertAll(v => v.ToDynamic()).ToArray();
            base.Save((object)dynamic);
        }

        public override void Update (Level @in)
        {
            base.Update(@in);
            foreach (var keyEvent in keyEvents)
            {
                if (keyEvent.Keys.All(key => @in.Down.Contains(key)))
                {
                    if (keyEvent is Movement)
                    {
                        Movement movement = keyEvent.As<Movement>();
                        if (onSolid)
                        {
                            if (movement.VelocityBased)
                                Velocity += movement.Velocity;
                            else
                                TryMove(@in, movement.Velocity);
                            keyEvent.WasLastFrame = true;
                            break;
                        }
                    }
                    else if (keyEvent is Shoot_OnKey && !keyEvent.WasLastFrame)
                    {
                        Shoot_OnKey shoot = keyEvent.As<Shoot_OnKey>();
                        //shoot.CreateShot.x = X + Width / 2 - ((double)shoot.CreateShot.width) / 2;
                        //shoot.CreateShot.y = Y + Height / 2 - ((double)shoot.CreateShot.height) / 2;
                        int compareX = ((double)shoot.CreateShot.vX).CompareTo(0);
                        int compareY = ((double)shoot.CreateShot.vY).CompareTo(0);
                        Vector2 position = new Vector2
                        {
                            X = compareX * Width - (compareX == -1 ? shoot.CreateShot.width : 0),
                            Y = compareY * Height - (compareY == -1 ? shoot.CreateShot.width : 0)
                        } + new Vector2 { X = X, Y = Y };
                        shoot.CreateShot.x = position.X;
                        shoot.CreateShot.y = position.Y;
                        Task<GameObject> created = Create(shoot.CreateShot);
                        created.ContinueWith(val => @in.Children.Add(val.Result));
                        keyEvent.WasLastFrame = true;
                        break;
                    }
                    keyEvent.WasLastFrame = true;
                }
                else keyEvent.WasLastFrame = false;
            }
        }

        public override async Task Parse (dynamic @dynamic)
        {
            keyEvents = new List<OnKeyEvent>();
            foreach (var keyEventDynamic in @dynamic.keyEvents)
            {
                keyEvents.Add(await OnKeyEvent.Create(keyEventDynamic));
            }
            await base.Parse((object)@dynamic);
        }
    }
}
