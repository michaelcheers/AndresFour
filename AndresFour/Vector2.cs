namespace AndresFour
{
    public struct Vector2
    {
        public double X;
        public double Y;

        public static Vector2 operator * (Vector2 a, double b) =>
            new Vector2
            {
                X = a.X * b,
                Y = a.Y * b
            };

        public static Vector2 operator + (Vector2 a, Vector2 b) =>
            new Vector2
            {
                X = a.X + b.X,
                Y = a.Y + b.Y
            };
    }
}