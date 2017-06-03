using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class RealGameObject : DrawnGameObject
    {
        public new const string Type = "real game object";
        public double Gravity;
        public int Strength = 5;
        public Vector2 Velocity = new Vector2();

        public override void Save(dynamic dynamic)
        {
            dynamic.gravity = Gravity;
            dynamic.strength = Strength;
            base.Save((object)dynamic);
        }

        public override Task Parse (dynamic dynamic)
        {
            Gravity = dynamic.gravity;
            Strength = dynamic.strength;
            return base.Parse((object)dynamic);
        }
        public List<RealGameObject> lastIntersects;
        public bool TryMove (Level @in, double NotMovingIn, ref double MovingIn, double NotMovingInLength, double MovingInLength, double Velocity, Func<Rectangle, double> GetMovingIn, Func<Rectangle, double> GetMovingInLength)
        {
            if (Velocity < 0)
                return TryMoveNegative(@in, NotMovingIn, ref MovingIn, NotMovingInLength, MovingInLength, -Velocity, GetMovingIn, GetMovingInLength);
            lastIntersects = new List<RealGameObject>();
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
                        lastIntersects.Add(realGameObject);
                }
            }
            if (lastIntersects.Count == 0)
                MovingIn += Velocity;
            else
            {
                double min = lastIntersects.Min(v => GetMovingIn(v.Position) - MovingInLength);
                MovingIn = min;
                return false;
            }
            return true;
        }
        public bool TryMoveNegative (Level @in, double NotMovingIn, ref double MovingIn, double NotMovingInLength, double MovingInLength, double Velocity, Func<Rectangle, double> GetMovingIn, Func<Rectangle, double> GetMovingInLength)
        {
            lastIntersects = new List<RealGameObject>();
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
                        lastIntersects.Add(realGameObject);
                }
            }
            if (lastIntersects.Count == 0)
                MovingIn -= Velocity;
            else
            {
                double max = lastIntersects.Max(v => GetMovingIn(v.Position) + GetMovingInLength(v.Position));
                MovingIn = max;
                return false;
            }
            return true;
        }
        public bool TryMove (Level @in, Vector2 velocity)
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
        public override void Update (Level @in)
        {
            if (!TryMove(@in, Velocity *= 0.99))
                (this as Shot)?.Corrode(@in);
            onSolid = !TryMove(@in, new Vector2
            {
                Y = Gravity
            });
        }
        internal bool onSolid;
    }
}
