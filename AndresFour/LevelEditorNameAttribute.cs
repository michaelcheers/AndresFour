using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndresFour
{
    public class LevelEditorNameAttribute : Attribute
    {
        public string LevelEditorName;
        public LevelEditorNameAttribute (string value)
        {
            LevelEditorName = value;
        }
    }
}
