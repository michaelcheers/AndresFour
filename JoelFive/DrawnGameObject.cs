using Bridge;
using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public class DrawnGameObject : GameObject
    {
        public double X;
        public double Y;
        public double Width;
        public double Height;
        public Union<HTMLImageElement, string> Image;

        public async Task Parse (DrawnGameObject gameObject, dynamic @dynamic)
        {
            X = @dynamic.x;
            Y = @dynamic.y;
            Width = @dynamic.width;
            Height = @dynamic.height;
            string imageString = @dynamic.image;
            if (imageString[0] == '#')
                Image = imageString;
            else
                Image = await App.LoadImage(imageString);
        }
    }
}
