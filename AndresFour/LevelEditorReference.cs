using Bridge.Html5;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class LevelEditorReference
    {
        public GameObject gameObject;
        public Dictionary<string, HTMLElement> cells;
        public Dictionary<string, MemberInfo> members;
    }
}
