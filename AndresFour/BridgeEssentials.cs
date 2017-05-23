using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JoelFive
{
    public static class BridgeEssentials
    {
        public static Task<HTMLImageElement> LoadImage(string value)
        {
            HTMLImageElement image = new HTMLImageElement
            {
                Src = value
            };
            TaskCompletionSource<HTMLImageElement> task = new TaskCompletionSource<HTMLImageElement>();
            image.OnLoad = e => task.SetResult(image);
            return task.Task;
        }
    }
}
