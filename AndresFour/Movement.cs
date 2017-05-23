using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class Movement
    {
        public Vector2 Velocity;
#pragma warning disable CS0108 // Member hides inherited member; missing new keyword
        public List<int> Keys;
#pragma warning restore CS0108 // Member hides inherited member; missing new keyword
    }
}
