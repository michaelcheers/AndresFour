using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class RealGameObject : DrawnGameObject
    {
        public new const string Type = "real game object";
        public int Gravity;

        public override void Save(dynamic dynamic)
        {
            dynamic.gravity = Gravity;
            base.Save((object)dynamic);
        }

        public override async Task Parse (dynamic @dynamic)
        {
            Gravity = @dynamic.gravity;
            await base.Parse((object)@dynamic);
        }
        public bool TryMove (Game @in, double NotMovingIn, ref double MovingIn, double NotMovingInLength, double MovingInLength, double Velocity, Func<Rectangle, double> GetMovingIn, Func<Rectangle, double> GetMovingInLength)
        {
            if (Velocity < 0)
                return TryMoveNegative(@in, NotMovingIn, ref MovingIn, NotMovingInLength, MovingInLength, -Velocity, GetMovingIn, GetMovingInLength);
            List<RealGameObject> intersects = new List<RealGameObject>();
            foreach (var child in @in.Children)
            {
                if (child is RealGameObject)
                {
                    var realGameObject = child.As<RealGameObject>();
                    var rect = new Rectangle
                    {
                        X = NotMovingIn,
                        Width = NotMovingInLength,
                        Y = MovingIn + MovingInLength,
                        Height = Velocity
                    };
                    if (GetMovingIn(rect) == rect.X && GetMovingInLength(rect) == rect.Width)
                    {
                        double newX = rect.Y;
                        double newY = rect.X;
                        double newWidth = rect.Height;
                        double newHeight = rect.Width;
                        rect = new Rectangle
                        {
                            X = newX,
                            Y = newY,
                            Width = newWidth,
                            Height = newHeight
                        };
                    }
                    bool doesIntersect = rect.Intersects(realGameObject.Position);
                    if (doesIntersect)
                        intersects.Add(realGameObject);
                }
            }
            if (intersects.Count == 0)
                MovingIn += Velocity;
            else
            {
                double min = intersects.Min(v => GetMovingIn(v.Position) - MovingInLength);
                MovingIn = min;
                return false;
            }
            return true;
        }
        public bool TryMoveNegative (Game @in, double NotMovingIn, ref double MovingIn, double NotMovingInLength, double MovingInLength, double Velocity, Func<Rectangle, double> GetMovingIn, Func<Rectangle, double> GetMovingInLength)
        {
            List<RealGameObject> intersects = new List<RealGameObject>();
            foreach (var child in @in.Children)
            {
                if (child is RealGameObject)
                {
                    var realGameObject = child.As<RealGameObject>();
                    var rect = new Rectangle
                    {
                        X = NotMovingIn,
                        Width = NotMovingInLength,
                        Y = MovingIn - Velocity,
                        Height = Velocity
                    };
                    if (GetMovingIn(rect) == rect.X && GetMovingInLength(rect) == rect.Width)
                    {
                        double newX = rect.Y;
                        double newY = rect.X;
                        double newWidth = rect.Height;
                        double newHeight = rect.Width;
                        rect = new Rectangle
                        {
                            X = newX,
                            Y = newY,
                            Width = newWidth,
                            Height = newHeight
                        };
                    }
                    bool doesIntersect = rect.Intersects(realGameObject.Position);
                    if (doesIntersect)
                        intersects.Add(realGameObject);
                }
            }
            if (intersects.Count == 0)
                MovingIn -= Velocity;
            else
            {
                double max = intersects.Max(v => GetMovingIn(v.Position) + GetMovingInLength(v.Position));
                MovingIn = max;
                return false;
            }
            return true;
        }
        public bool TryMove (Game @in, Vector2 velocity)
        {
            if (velocity.X != 0 && velocity.Y != 0)
            {
                bool canMove = true;
                canMove = TryMove(@in, new Vector2
                {
                    X = velocity.X
                }) ? canMove : false;
                canMove = TryMove(@in, new Vector2
                {
                    Y = velocity.Y
                }) ? canMove : false;
                return canMove;
            }
            if (velocity.X != 0)
                return TryMove(@in, Position.Y, ref Position.X, Position.Height, Position.Width, velocity.X, v => v.X, v => v.Width);
            if (velocity.Y != 0)
                return TryMove(@in, Position.X, ref Position.Y, Position.Width, Position.Height, velocity.Y, v => v.Y, v => v.Height);
            return true;
        }
        public virtual void Update (Game @in)
        {
            onSolid = !TryMove(@in, new Vector2
            {
                Y = Gravity
            });
        }
        public bool onSolid;
    }
}
