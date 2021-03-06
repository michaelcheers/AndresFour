﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public struct Rectangle
    {
        public double X;
        public double Y;
        double _width;
        double _height;

        public static Rectangle operator + (Rectangle a, Vector2 b) =>
            new Rectangle
            {
                X = a.X + b.X,
                Y = a.Y + b.Y,
                Width = a.Width,
                Height = a.Height
            };

        public bool Contains(Vector2 value)
        {
            return ((((this.X <= value.X) && (value.X < (this.X + this.Width))) && (this.Y <= value.Y)) && (value.Y < (this.Y + this.Height)));
        }
        public double Width
        {
            get
            {
                return _width;
            }
            set
            {
                if (value < 0)
                {
                    X -= value;
                    value = -value;
                }
                _width = value;
            }
        }
        public double Height
        {
            get
            {
                return _height;
            }
            set
            {
                if (value < 0)
                {
                    Y -= value;
                    value = -value;
                }
                _height = value;
            }
        }

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
