using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public struct Rectangle
    {
        public double X;
        public double Y;
        public double Width;
        public double Height;

        /// <summary>
        /// Gets whether or not the other <see cref="Rectangle"/> intersects with this rectangle.
        /// </summary>
        /// <param name="value">The other rectangle for testing.</param>
        /// <returns><c>true</c> if other <see cref="Rectangle"/> intersects with this rectangle; <c>false</c> otherwise.</returns>
        public bool Intersects(Rectangle value) =>
            value.X < X + Width &&
            X < value.X + value.Width &&
            value.Y < Y + Height &&
            Y < value.Y + value.Height;

    }
}
