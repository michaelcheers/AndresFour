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
                            TryMove(@in, movement.Velocity);
                            break;
                        }
                    }
                    else if (keyEvent is Shoot_OnKey)
                    {
                        Shoot_OnKey shoot = keyEvent.As<Shoot_OnKey>();
                        shoot.CreateShot.x = X;
                        shoot.CreateShot.y = Y;
                        Task<GameObject> created = Create(shoot.CreateShot);
                        created.ContinueWith(val => @in.Children.Add(val.Result));
                        break;
                    }
                }
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
