/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta
 */
Bridge.assembly("AndresFour", function ($asm, globals) {
    "use strict";

    Bridge.define("AndresFour.BridgeEssentials", {
        statics: {
            methods: {
                LoadImage: function (value) {
                    var $t;
                    var image = ($t=new Image(), $t.src = value, $t);
                    var task = new System.Threading.Tasks.TaskCompletionSource();
                    image.onload = function (e) {
                        task.setResult(image);
                    };
                    return task.task;
                }
            }
        }
    });

    Bridge.define("AndresFour.GameObject", {
        statics: {
            methods: {
                Create: function (dynamic) {
                    var $step = 0,
                        $task1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        result, 
                        type, 
                        fromType, 
                        $t, 
                        a, 
                        iter, 
                        goA, 
                        dBreak, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            result = null;
                                            type = dynamic.type;
                                            fromType = null;
                                            $t = Bridge.getEnumerator(Bridge.Reflection.getAssemblyTypes(Bridge.Reflection.getTypeAssembly(AndresFour.GameObject)));
                                            try {
                                                while ($t.moveNext()) {
                                                    a = $t.Current;
                                                    if (Bridge.referenceEquals(Bridge.global.Bridge.getMetadata(a), undefined)) {
                                                        continue;
                                                    }
                                                    if (((Bridge.Reflection.getMetaValue(a, 'att', 0)  & 128)  != 0)) {
                                                        continue;
                                                    }
                                                    iter = a;
                                                    dBreak = false;
                                                    do {
                                                        goA = false;
                                                        if (Bridge.referenceEquals(Bridge.Reflection.getBaseType(iter), AndresFour.GameObject)) {
                                                            if (Bridge.referenceEquals(Bridge.cast(Bridge.Reflection.fieldAccess(Bridge.Reflection.getMembers(a, 4, 284, "Type"), null), System.String), type)) {
                                                                fromType = a;
                                                                dBreak = true; /// Possible mistaken empty statement


                                                            } else {
                                                                ;
                                                            }
                                                        } else {
                                                            if (!Bridge.referenceEquals(Bridge.Reflection.getBaseType(iter), System.Object)) {
                                                                iter = Bridge.Reflection.getBaseType(iter);
                                                                goA = true;
                                                            }
                                                        }
                                                    } while (goA);
                                                    if (dBreak) {
                                                        break;
                                                    }
                                                }
                                            }finally {
                                                if (Bridge.is($t, System.IDisposable)) {
                                                    $t.System$IDisposable$dispose();
                                                }
                                            }if (fromType == null) {
                                                throw new System.Exception(System.String.format("Unknown type: {0}", type));
                                            }
                                            $task1 = ((result = Bridge.cast(Bridge.Reflection.invokeCI(Bridge.Reflection.getMembers(fromType, 1, 284, null, System.Array.init([], Function)), [null]), AndresFour.GameObject))).Parse(dynamic);
                                            $step = 1;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $task1.getAwaitedResult();
                                            if (dynamic.name != null) {
                                                result.Name = dynamic.name;
                                            }
                                            $tcs.setResult(result);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                }
            }
        },
        fields: {
            Name: null
        },
        methods: {
            Parse: function (dynamic) {
                var $step = 0,
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0], $step);
                                switch ($step) {
                                    case 0: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            Save: function (dynamic) {
                dynamic.name = this.Name;
            },
            toDynamic: function () {
                var result = { type: Bridge.Reflection.fieldAccess(Bridge.Reflection.getMembers(Bridge.getType(this), 4, 284, "Type"), null) };
                this.Save(result);
                return result;
            },
            Update: function ($in) {
            }
        }
    });

    Bridge.define("AndresFour.LevelEditor", {
        statics: {
            fields: {
                level: null,
                left: null,
                right: null,
                table: null,
                levels: null,
                creation: null,
                allowed: null,
                mouseDownEvent: null,
                selected: null,
                cross: null
            },
            ctors: {
                init: function () {
                    this.allowed = System.Array.init([System.String, System.Double], Function);
                }
            },
            methods: {
                Save: function () {
                    AndresFour.LevelEditor.SaveToStorage();
                    //HTMLAnchorElement download = new HTMLAnchorElement
                    //{
                    //    Download = "level.dat",
                    //    Href = $"data:text/plain;charset=UTF-8,{Global.Btoa(JSON.Stringify(dynamicVal))}"
                    //};
                    //download.Click();
                },
                FileRead: function (fileInput) {
                    var file = fileInput.files[System.Array.index(0, fileInput.files)];
                    var fileReader = new FileReader();
                    var task = new System.Threading.Tasks.TaskCompletionSource();
                    fileReader.onload = function (e) {
                        task.setResult(fileReader.result);
                    };
                    fileReader.readAsText(file);
                    return task.task;
                },
                CreateLevel: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        level, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = AndresFour.GameObject.Create(AndresFour.MainStarter.levelTemplate);
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        level = Bridge.cast(($taskResult1), AndresFour.Level);
                                        AndresFour.LevelEditor.levels.add(level);
                                        AndresFour.LevelEditor.level = level;
                                        AndresFour.LevelEditor.SelectLevel(level);
                                        AndresFour.LevelEditor.SaveToStorage();
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                SaveToStorage: function () {
                    var $t;
                    var resulting = System.Array.init([], System.Object);
                    $t = Bridge.getEnumerator(AndresFour.LevelEditor.levels);
                    try {
                        while ($t.moveNext()) {
                            var level = $t.Current;
                            var dynamicVal = level.toDynamic();
                            if (Bridge.referenceEquals(level, AndresFour.LevelEditor.level)) {
                                dynamicVal.recovery = AndresFour.LevelEditor.creation;
                            }
                            resulting.push(dynamicVal);
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }Bridge.global.localStorage.setItem("levels", JSON.stringify(resulting));
                },
                LoadFromStorage: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        dStorage, 
                        $t, 
                        stItem, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1,2,3,4], $step);
                                    switch ($step) {
                                        case 0: {
                                            AndresFour.LevelEditor.levels.clear();
                                            dStorage = JSON.parse(Bridge.global.localStorage.getItem("levels"));
                                            $t = Bridge.getEnumerator(Bridge.cast(dStorage, System.Array.type(System.Object)));
                                            $step = 1;
                                            continue;
                                        }
                                        case 1: {
                                            if ($t.moveNext()) {
                                                stItem = $t.Current;
                                                $step = 2;
                                                continue;
                                            }
                                            $step = 4;
                                            continue;
                                        }
                                        case 2: {
                                            $task1 = AndresFour.GameObject.Create(stItem);
                                            $step = 3;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 3: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            AndresFour.LevelEditor.levels.add(Bridge.cast(($taskResult1), AndresFour.Level));
                                            $step = 1;
                                            continue;
                                        }
                                        case 4: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                SelectLevel: function (level) {
                    AndresFour.LevelEditor.creation = level.toDynamic();
                    AndresFour.LevelEditor.level = level;
                    document.body.innerHTML = "";
                    AndresFour.LevelEditor.SetupLevel();
                    AndresFour.LevelEditor.Refresh();
                },
                SetupLevel: function () {
                    var $t, $t1, $t2, $t3;
                    AndresFour.LevelEditor.level.Canvas.onclick = AndresFour.LevelEditor.Click;
                    AndresFour.LevelEditor.level.Canvas.style.border = "1px solid black";
                    document.body.appendChild(($t = document.createElement('div'), AndresFour.LevelEditor.left = $t, $t));
                    document.body.appendChild(($t1 = document.createElement('div'), AndresFour.LevelEditor.right = $t1, $t1));
                    AndresFour.LevelEditor.right.appendChild(($t2 = document.createElement('table'), AndresFour.LevelEditor.table = $t2, $t2));
                    AndresFour.LevelEditor.left.style.width = "50%";
                    AndresFour.LevelEditor.right.style.width = "50%";
                    AndresFour.LevelEditor.left.style.cssFloat = "left";
                    AndresFour.LevelEditor.right.style.cssFloat = "right";
                    AndresFour.LevelEditor.left.appendChild(AndresFour.LevelEditor.level.Canvas);
                    var button = ($t3=document.createElement('button'), $t3.innerHTML = "Save", $t3.onclick = $asm.$.AndresFour.LevelEditor.f1, $t3);
                    button.style.position = "fixed";
                    button.style.bottom = "0";
                    button.style.left = "0";
                    document.body.appendChild(button);
                },
                CreateLevelSelectDiv: function (toSelect) {
                    var $t, $t1;
                    var result = document.createElement('div');
                    result.style.border = "1px solid black";
                    var list = document.createElement('ul');
                    $t = Bridge.getEnumerator(AndresFour.LevelEditor.levels);
                    try {
                        while ($t.moveNext()) {
                            (function () {
                                var level = $t.Current;
                                var levelA = document.createElement('li');
                                levelA.appendChild(($t1=document.createElement('a'), $t1.href = "javascript:void(0)", $t1.onclick = function (e) {
                                    toSelect(level);
                                }, $t1.innerHTML = level.Name, $t1));
                                list.appendChild(levelA);
                            }).call(this);
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }result.appendChild(list);
                    return result;
                },
                Start: function () {
                    var $step = 0,
                        $task1, 
                        $task2, 
                        $taskResult2, 
                        $jumpFromFinally, 
                        start, 
                        $t, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = AndresFour.LevelEditor.LoadFromStorage();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $task1.getAwaitedResult();
                                        $task2 = AndresFour.BridgeEssentials.LoadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH4QUVEx4JDRbQCAAAAzNJREFUeNrt3cFt4zAQBdCfxRbhdBHAhcSXACnDZaSCPfsYIAWkigBpYS/BAt4euAdJgOLVSCNyKJGc/wHdbIrzH2I7sBIBDMMwDMMwjH3uNA8KKU92mJS+Zh8TUhdwmNTOfirPcwDwDOABwB8AbwA+hg0QpcsNxhHAE7ruPgG8ousufvH+OATgPQBhdPwOwOPoMe4Tvh+PfUfjzt77LuP6Gi1+vll4OL4CcCLKfxinvpupzs4WIBdhcaJgFUbou5zt6YfinHOve/cAfgE4jTfoJTeznvou7meeYvIecpx4PXT/k7LyJ2N43z1avGQNb1JLJ3SDEoHxZfIhiCiLnWyHIWzANcruGMJGXKIUgyFsyBVKcRjCxlygFIshbLBplOIxhI02iVINhrDhplCqwxA23gRKtRjCAFWjVI8hDFIlSjMYwkBVoTSHIQxWBUqzGMKARaM0jyEMWiSKGwxh4KJQ3GEIgxeB4hZDKGBXFPcYQhG7oBBjvpBNUYihK2YTFGKsKygrCjHiisqCQoyVyYlCjMjkQCFGYixRiGEUCxRiGMcQhRhWMUAhhnUSUIiRKxEof/uDGLkSgUKM3DFCIYZlElGIkSMTH2uvCoxrKOQyozXR/BVuiUn+tyFMZCJ+6cvyJReDZAyiWMYIgygWicC4Kt7oiRKTCIzho22Wbx5dJwGjiOu+mooBBlGsYohBlNRYYAhrEWVtLDGENYmiTQ4MYW2iLCUnhnAOoiiLyvq1K1HWFbTJd+BE0RWz6QUJRJkvZJerQ4gyXcSul+q4RykJQ9iTH5QSMYS9tY9SMoawx3ZRasAQ9toeSk0Ywp7bQakRQ9h7/Sg1Ywgz1IvSAoYwS30oLWEIM9WD0iKGMFv5KC1jCDOWi+IBQ5i1PBRPGMLM5aB4xBBm3x/FM4bQwX4oxBC72B6FGIudbIdCDHU326CMnqy9saQLjIl+tChmN5Z8IcZiR1qUFwuQCzFUPWlQLhYgZ2Kou1pCOVuA8Ab3ikygRN3g/m7pJH0OAJ4BPKC7BfUbgA/VIo5yU/QRwBO67j4BvKK/ffdcX1qQuAUcJrUzVZ8h5ckOw74YhmEYhmFKyz+CH5J6R0WlaQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0yMVQxOTozMDowOSswMDowME2eJS8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMjFUMTk6MzA6MDkrMDA6MDA8w52TAAAAAElFTkSuQmCC");
                                        $step = 2;
                                        $task2.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        AndresFour.LevelEditor.cross = $taskResult2;
                                        AndresFour.LevelEditor.cross.width = 10;
                                        AndresFour.LevelEditor.cross.height = 10;
                                        //HTMLDivElement start = new HTMLDivElement();
                                        //HTMLInputElement input = new HTMLInputElement();
                                        //HTMLInputElement file = new HTMLInputElement
                                        //{
                                        //    Type = InputType.File
                                        //};
                                        //start.AppendChild(input);
                                        //start.AppendChild(new Text(" or"));
                                        //start.AppendChild(new HTMLBRElement());
                                        //start.AppendChild(file);
                                        document.body.innerHTML = "";
                                        start = document.createElement('div');
                                        start.appendChild(($t=document.createElement('button'), $t.innerHTML = "Create Level", $t.onclick = $asm.$.AndresFour.LevelEditor.f2, $t));
                                        start.appendChild(AndresFour.LevelEditor.CreateLevelSelectDiv(AndresFour.LevelEditor.SelectLevel));
                                        document.body.appendChild(start);
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                Remove: function (gameObject) {
                    if (!AndresFour.LevelEditor.level.Children.remove(gameObject)) {
                        throw new System.Exception();
                    }
                    AndresFour.LevelEditor.Refresh();
                },
                CreateCell: function (table, toAppend) {
                    var $t;
                    if (toAppend === void 0) { toAppend = []; }
                    var row1 = document.createElement('tr');
                    table.appendChild(row1);
                    var cell1 = document.createElement('td');
                    $t = Bridge.getEnumerator(toAppend);
                    try {
                        while ($t.moveNext()) {
                            var append = $t.Current;
                            cell1.appendChild(append);
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }row1.appendChild(cell1);
                },
                CreateReference: function (gameObject, outTable) {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    var result = ($t=new AndresFour.LevelEditorReference(), $t.gameObject = gameObject, $t.cells = new (System.Collections.Generic.Dictionary$2(System.String,HTMLElement))(), $t.members = new (System.Collections.Generic.Dictionary$2(System.String,System.Object))(), $t);
                    var type;
                    if (Bridge.is(gameObject, AndresFour.Character)) {
                        type = "Character";
                    } else {
                        if (Bridge.is(gameObject, AndresFour.RealGameObject)) {
                            type = "Real Thing";
                        } else {
                            if (Bridge.is(gameObject, AndresFour.DrawnGameObject)) {
                                type = "Illusion";
                            } else {
                                throw new System.Exception(System.String.format("Type not allowed: {0}", Bridge.Reflection.getTypeFullName(Bridge.getType(gameObject))));
                            }
                        }
                    }
                    var table = document.createElement('table');
                    var row = document.createElement('tr');
                    var cell = ($t1=document.createElement('td'), $t1.innerHTML = "Type", $t1);
                    var cell2 = ($t2=document.createElement('td'), $t2.innerHTML = type, $t2);
                    result.cells.add("Type", cell2);
                    row.appendChild(cell);
                    row.appendChild(cell2);
                    table.appendChild(row);
                    var fields = new (System.Collections.Generic.List$1(System.Object))(Bridge.Reflection.getMembers(Bridge.getType(gameObject), 4, 28));
                    fields.addRange(Bridge.Reflection.getMembers(Bridge.getType(gameObject), 16, 28));
                    $t3 = Bridge.getEnumerator(fields);
                    try {
                        while ($t3.moveNext()) {
                            var field = $t3.Current;
                            if ((field.is || false)) {
                                continue;
                            }
                            var memberType;
                            if (Bridge.is(field, System.Reflection.FieldInfo)) {
                                memberType = Bridge.cast(field, System.Reflection.FieldInfo).rt;
                            } else {
                                if (Bridge.is(field, System.Reflection.PropertyInfo)) {
                                    memberType = Bridge.cast(field, System.Reflection.PropertyInfo).rt;
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            if (System.Array.contains(AndresFour.LevelEditor.allowed, memberType, Function)) {
                                var value;
                                if (Bridge.is(field, System.Reflection.FieldInfo)) {
                                    value = Bridge.Reflection.fieldAccess(Bridge.cast(field, System.Reflection.FieldInfo), gameObject);
                                } else {
                                    if (Bridge.is(field, System.Reflection.PropertyInfo)) {
                                        value = Bridge.Reflection.midel(Bridge.cast(field, System.Reflection.PropertyInfo).g, gameObject)();
                                    } else {
                                        throw new System.Exception();
                                    }
                                }
                                row = document.createElement('tr');
                                var valueString;
                                if (Bridge.is(value, System.String)) {
                                    valueString = Bridge.cast(value, System.String);
                                } else {
                                    if (Bridge.is(value, System.Double)) {
                                        valueString = System.Double.format(System.Nullable.getValue(Bridge.cast(Bridge.unbox(value), System.Double)), 'G');
                                    } else {
                                        throw new System.Exception();
                                    }
                                }
                                cell = ($t4=document.createElement('td'), $t4.innerHTML = field.n, $t4);
                                cell2 = ($t5=document.createElement('td'), $t5.contentEditable = "true", $t5.innerHTML = valueString, $t5);
                                result.cells.add(field.n, cell2);
                                result.members.add(field.n, field);
                                row.appendChild(cell);
                                row.appendChild(cell2);
                                table.appendChild(row);
                            }
                        }
                    }finally {
                        if (Bridge.is($t3, System.IDisposable)) {
                            $t3.System$IDisposable$dispose();
                        }
                    }row = document.createElement('tr');
                    cell = document.createElement('td');
                    cell.appendChild(($t6=document.createElement('button'), $t6.innerHTML = "Save Changes", $t6.onclick = function (e) {
                        AndresFour.LevelEditor.SaveChanges(result);
                    }, $t6));
                    row.appendChild(cell);
                    table.appendChild(row);
                    outTable.v = table;
                    return result;
                },
                SaveChanges: function (reference) {
                    var $t;
                    $t = Bridge.getEnumerator(reference.cells);
                    try {
                        while ($t.moveNext()) {
                            var cell = $t.Current;
                            if (Bridge.referenceEquals(cell.key, "Type")) {
                                continue;
                            }
                            var memberInfo = reference.members.get(cell.key);
                            var value;
                            if (Bridge.is(memberInfo, System.Reflection.FieldInfo)) {
                                value = Bridge.cast(memberInfo, System.Reflection.FieldInfo).rt;
                            } else {
                                if (Bridge.is(memberInfo, System.Reflection.PropertyInfo)) {
                                    value = Bridge.cast(memberInfo, System.Reflection.PropertyInfo).rt;
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            var toWriteValue;
                            if (Bridge.referenceEquals(value, System.String)) {
                                toWriteValue = cell.value.innerHTML;
                            } else {
                                if (Bridge.referenceEquals(value, System.Double)) {
                                    toWriteValue = Bridge.box(System.Double.parse(cell.value.innerHTML), System.Double, $box_.System.Double.toString);
                                } else {
                                    throw new System.Exception();
                                }
                            }
                            if (Bridge.is(memberInfo, System.Reflection.FieldInfo)) {
                                Bridge.Reflection.fieldAccess(Bridge.cast(memberInfo, System.Reflection.FieldInfo), reference.gameObject, Bridge.unbox(toWriteValue));
                            } else {
                                Bridge.Reflection.midel(Bridge.cast(memberInfo, System.Reflection.PropertyInfo).s, reference.gameObject)(Bridge.unbox(toWriteValue));
                            }
                        }
                    }finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$dispose();
                        }
                    }AndresFour.LevelEditor.Refresh();
                },
                Click: function (mouseEvent) {
                    var $t;
                    AndresFour.LevelEditor.mouseDownEvent != null ? AndresFour.LevelEditor.mouseDownEvent.setResult(($t=new AndresFour.Vector2(), $t.X = mouseEvent.layerX, $t.Y = mouseEvent.layerY, $t)) : null;
                },
                WaitForClick: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                        $returnValue, 
                        result, 
                        $async_e, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            try {
                                for (;;) {
                                    $step = System.Array.min([0,1], $step);
                                    switch ($step) {
                                        case 0: {
                                            AndresFour.LevelEditor.mouseDownEvent = new System.Threading.Tasks.TaskCompletionSource();
                                            $task1 = AndresFour.LevelEditor.mouseDownEvent.task;
                                            $step = 1;
                                            $task1.continueWith($asyncBody);
                                            return;
                                        }
                                        case 1: {
                                            $taskResult1 = $task1.getAwaitedResult();
                                            result = $taskResult1;
                                            AndresFour.LevelEditor.mouseDownEvent = null;
                                            $tcs.setResult(result.$clone());
                                            return;
                                        }
                                        default: {
                                            $tcs.setResult(null);
                                            return;
                                        }
                                    }
                                }
                            } catch($async_e1) {
                                $async_e = System.Exception.create($async_e1);
                                $tcs.setException($async_e);
                            }
                        }, arguments);

                    $asyncBody();
                    return $tcs.task;
                },
                CreateRectangle: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $task2, 
                        $taskResult2, 
                        $jumpFromFinally, 
                        a, 
                        b, 
                        rect, 
                        $t, 
                        created, 
                        $t1, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1,2], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = AndresFour.LevelEditor.WaitForClick();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        a = $taskResult1;
                                        $task2 = AndresFour.LevelEditor.WaitForClick();
                                        $step = 2;
                                        $task2.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 2: {
                                        $taskResult2 = $task2.getAwaitedResult();
                                        b = $taskResult2;
                                        rect = ($t=new AndresFour.Rectangle(), $t.X = a.X, $t.Y = a.Y, $t.Width = b.X - a.X, $t.Height = b.Y - a.Y, $t);
                                        created = ($t1=new AndresFour.RealGameObject(), $t1.Gravity = 0, $t1.Position = rect.$clone(), $t1.Image = "#ffffff", $t1.Name = "New Object", $t1);
                                        AndresFour.LevelEditor.level.Children.add(created);
                                        AndresFour.LevelEditor.Select(created);
                                        AndresFour.LevelEditor.Refresh();
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                CreateBlock: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        at, 
                        create, 
                        $t, 
                        created, 
                        $t1, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        $task1 = AndresFour.LevelEditor.WaitForClick();
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        at = $taskResult1;
                                        create = ($t=new AndresFour.Rectangle(), $t.Width = 32, $t.Height = 32, $t.X = at.X - 16, $t.Y = at.Y - 16, $t);
                                        created = ($t1=new AndresFour.RealGameObject(), $t1.Gravity = 0, $t1.Position = create.$clone(), $t1.Image = "#ffffff", $t1.Name = "New Block", $t1);
                                        AndresFour.LevelEditor.level.Children.add(created);
                                        AndresFour.LevelEditor.Select(created);
                                        AndresFour.LevelEditor.Refresh();
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                },
                Refresh: function () {
                    var $t, $t1, $t2, $t3, $t4, $t5, $t6;
                    AndresFour.LevelEditor.table.innerHTML = "";
                    //CreateCell(table, new HTMLAnchorElement
                    //{
                    //    Href = "javascript:void(0)",
                    //    InnerHTML = "Create Rectangle",
                    //    OnClick = e => CreateRectangle()
                    //});
                    AndresFour.LevelEditor.CreateCell(AndresFour.LevelEditor.table, [($t=document.createElement('a'), $t.href = "javascript:void(0)", $t.innerHTML = "Create Block", $t.onclick = $asm.$.AndresFour.LevelEditor.f3, $t)]);
                    AndresFour.LevelEditor.CreateCell(AndresFour.LevelEditor.table, [($t1=document.createElement('a'), $t1.href = "javascript:void(0)", $t1.onclick = $asm.$.AndresFour.LevelEditor.f4, $t1.innerHTML = "Unselect", $t1)]);
                    $t2 = Bridge.getEnumerator(AndresFour.LevelEditor.level.Children);
                    try {
                        while ($t2.moveNext()) {
                            $t3 = (function () {
                                var gameObject = $t2.Current;
                                if (System.String.isNullOrEmpty(gameObject.Name)) {
                                    return {jump:1};
                                }
                                var row = document.createElement('tr');
                                var cell = document.createElement('td');
                                cell.style.borderBottom = "1px solid black";
                                cell.appendChild(($t4=document.createElement('a'), $t4.innerHTML = gameObject.Name, $t4.href = "javascript:void(0)", $t4.onclick = function (v) {
                                    AndresFour.LevelEditor.Select(gameObject);
                                }, $t4));
                                cell.appendChild(document.createTextNode(" "));
                                var cross = ($t5=document.createElement('a'), $t5.onclick = function (v) {
                                    AndresFour.LevelEditor.Remove(gameObject);
                                }, $t5.href = "javascript:void(0)", $t5);
                                cross.appendChild(($t6 = AndresFour.LevelEditor.cross.cloneNode(), AndresFour.LevelEditor.cross = $t6, $t6));
                                cell.appendChild(cross);
                                cell.appendChild(document.createElement('br'));
                                var tableNested = { };
                                var reference = AndresFour.LevelEditor.CreateReference(gameObject, tableNested);
                                cell.appendChild(tableNested.v);
                                row.appendChild(cell);
                                AndresFour.LevelEditor.table.appendChild(row);
                            }).call(this) || {};
                            if($t3.jump == 1) continue;
                        }
                    }finally {
                        if (Bridge.is($t2, System.IDisposable)) {
                            $t2.System$IDisposable$dispose();
                        }
                    }AndresFour.LevelEditor.level.Draw();
                },
                Select: function (gameObject) {
                    if (Bridge.is(AndresFour.LevelEditor.selected, AndresFour.DrawnGameObject)) {
                        AndresFour.LevelEditor.selected.Selected = false;
                    }
                    if (Bridge.is(((AndresFour.LevelEditor.selected = gameObject, gameObject)), AndresFour.DrawnGameObject)) {
                        gameObject.Selected = true;
                    }
                    AndresFour.LevelEditor.Refresh();
                }
            }
        }
    });

    Bridge.ns("AndresFour.LevelEditor", $asm.$);

    Bridge.apply($asm.$.AndresFour.LevelEditor, {
        f1: function (e) {
            AndresFour.LevelEditor.Save();
        },
        f2: function (e) {
        AndresFour.LevelEditor.CreateLevel();
    },
        f3: function (e) {
            AndresFour.LevelEditor.CreateBlock();
        },
        f4: function (e) {
            AndresFour.LevelEditor.Select(null);
        }
    });

    Bridge.define("AndresFour.LevelEditorReference", {
        fields: {
            gameObject: null,
            cells: null,
            members: null
        }
    });

    Bridge.define("AndresFour.MainStarter", {
        main: function Main() {
            var $step = 0,
                $task1, 
                $jumpFromFinally, 
                list, 
                version, 
                $t, 
                link, 
                $t1, 
                $t2, 
                $asyncBody = Bridge.fn.bind(this, function () {
                    for (;;) {
                        $step = System.Array.min([0,1], $step);
                        switch ($step) {
                            case 0: {
                                list = document.createElement('ul');
                                if (!Bridge.global.localStorage.hasOwnProperty("levels")) {
                                    Bridge.global.localStorage.clear();
                                    Bridge.global.localStorage.setItem("levels", "[]");
                                    Bridge.global.localStorage.setItem("v", AndresFour.MainStarter.FileVersion.toString());
                                }
                                version = System.Int32.parse(($t = Bridge.global.localStorage.getItem("v"), $t != null ? $t : "0"));
                                if (version !== AndresFour.MainStarter.FileVersion) {
                                    if (Bridge.global.confirm(System.String.format("Program version is {0}, your local files have version {1}, this program will almost certainly not work if you do not clear this game's data (your data should still be recoverable). Would you like to do so?", Bridge.box(AndresFour.MainStarter.FileVersion, System.Int32), Bridge.box(version, System.Int32)))) {
                                        Bridge.global.localStorage.setItem("oldS", JSON.stringify(Bridge.global.localStorage));
                                        Bridge.global.localStorage.setItem("levels", "[]");
                                        Bridge.global.localStorage.setItem("v", AndresFour.MainStarter.FileVersion.toString());
                                    }
                                    Bridge.global.localStorage.setItem("levels", "[]");
                                    Bridge.global.localStorage.setItem("v", AndresFour.MainStarter.FileVersion.toString());
                                }
                                AndresFour.LevelEditor.levels = new (System.Collections.Generic.List$1(AndresFour.Level))();
                                $task1 = AndresFour.LevelEditor.LoadFromStorage();
                                $step = 1;
                                $task1.continueWith($asyncBody, true);
                                return;
                            }
                            case 1: {
                                $task1.getAwaitedResult();
                                link = document.createElement('li');
                                link.appendChild(($t1=document.createElement('a'), $t1.innerHTML = "Play Game", $t1.onclick = $asm.$.AndresFour.MainStarter.f1, $t1.href = "javascript:void(0)", $t1));
                                list.appendChild(link);
                                list.appendChild(document.createElement('br'));
                                link = document.createElement('li');
                                link.appendChild(($t2=document.createElement('a'), $t2.innerHTML = "Level Editor", $t2.onclick = $asm.$.AndresFour.MainStarter.f2, $t2.href = "javascript:void(0)", $t2));
                                list.appendChild(link);
                                document.body.appendChild(list);
                                return;
                            }
                            default: {
                                return;
                            }
                        }
                    }
                }, arguments);

            $asyncBody();
        },
        statics: {
            fields: {
                levelTemplate: null,
                FileVersion: 0
            },
            ctors: {
                init: function () {
                    this.levelTemplate = { interval: 16, drawInterval: 16, width: 600, height: 500, name: "Untitled", type: AndresFour.Level.Type, children: (System.Array.init([{ type: AndresFour.DrawnGameObject.Type, x: 0, y: 0, width: 600, height: 500, image: "data:image/jpeg;base64,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" }, { type: AndresFour.Character.Type, x: 100, y: 400, width: -32, height: -32, image: "#999999", gravity: 1, strength: 5, keyEvents: (System.Array.init([{ keys: (System.Array.init([68], System.Int32)), x: 1, y: 0, type: AndresFour.Movement.Type, velox: false }, { keys: (System.Array.init([65], System.Int32)), x: -1, y: 0, type: AndresFour.Movement.Type, velox: false }, { keys: (System.Array.init([32], System.Int32)), x: 0, y: -50, type: AndresFour.Movement.Type, velox: true }, { keys: (System.Array.init([39], System.Int32)), type: AndresFour.Shoot_OnKey.Type, shot: { vX: 50, vY: 0, width: 20, height: 4, image: "#eeeeee", gravity: 0, type: AndresFour.Shot.Type, corrosivity: 1 } }, { keys: (System.Array.init([37], System.Int32)), type: AndresFour.Shoot_OnKey.Type, shot: { vX: -50, vY: 0, width: 20, height: 4, image: "#eeeeee", gravity: 0, type: AndresFour.Shot.Type, corrosivity: 1 } }, { keys: (System.Array.init([40], System.Int32)), type: AndresFour.Shoot_OnKey.Type, shot: { vX: 0, vY: 50, width: 4, height: 20, image: "#eeeeee", gravity: 0, type: AndresFour.Shot.Type, corrosivity: 1 } }, { keys: (System.Array.init([38], System.Int32)), type: AndresFour.Shoot_OnKey.Type, shot: { vX: 0, vY: -50, width: 4, height: 20, image: "#eeeeee", gravity: 0, type: AndresFour.Shot.Type, corrosivity: 1 } }], System.Object)), name: "Main Character" }, { type: AndresFour.RealGameObject.Type, x: 10, y: 0, width: 50, height: 50, gravity: 5, strength: 0, image: "#ffffff" }, { type: AndresFour.RealGameObject.Type, x: -1, y: 0, width: 1, height: 500, image: "#000000", gravity: 0, strength: 5 }, { type: AndresFour.RealGameObject.Type, x: 0, y: -1, width: 600, height: 1, image: "#000000", gravity: 0, strength: 5 }, { type: AndresFour.RealGameObject.Type, x: 600, y: 0, width: 1, height: 500, image: "#000000", gravity: 0, strength: 5 }, { type: AndresFour.RealGameObject.Type, x: 0, y: 500, width: 600, height: 1, image: "#000000", gravity: 0, strength: 5 }], System.Object)) };
                    this.FileVersion = 2;
                }
            },
            methods: {
                FileRead: function (fileInput) {
                    var file = fileInput.files[System.Array.index(0, fileInput.files)];
                    var fileReader = new FileReader();
                    var task = new System.Threading.Tasks.TaskCompletionSource();
                    fileReader.onload = function (e) {
                        task.setResult(fileReader.result);
                    };
                    fileReader.readAsText(file);
                    return task.task;
                },
                Start: function () {
                    var $step = 0,
                        $task1, 
                        $taskResult1, 
                        $jumpFromFinally, 
                        task, 
                        level, 
                        $asyncBody = Bridge.fn.bind(this, function () {
                            for (;;) {
                                $step = System.Array.min([0,1], $step);
                                switch ($step) {
                                    case 0: {
                                        task = new System.Threading.Tasks.TaskCompletionSource();
                                        document.body.innerHTML = "";
                                        document.body.appendChild(AndresFour.LevelEditor.CreateLevelSelectDiv(Bridge.fn.cacheBind(task, task.setResult)));
                                        $task1 = task.task;
                                        $step = 1;
                                        $task1.continueWith($asyncBody, true);
                                        return;
                                    }
                                    case 1: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        level = $taskResult1;
                                        level.Canvas.style.border = "1px solid black";
                                        document.body.innerHTML = "";
                                        document.body.appendChild(level.Canvas);
                                        level.Start();
                                        //HTMLDivElement start = new HTMLDivElement();
                                        //HTMLInputElement input = new HTMLInputElement();
                                        //HTMLInputElement file = new HTMLInputElement
                                        //{
                                        //    Type = InputType.File
                                        //};
                                        //start.AppendChild(input);
                                        //start.AppendChild(new Text(" or"));
                                        //start.AppendChild(new HTMLBRElement());
                                        //start.AppendChild(file);
                                        //Document.Body.AppendChild(start);
                                        //TaskCompletionSource<string> task = new TaskCompletionSource<string>();
                                        //input.OnInput = e => task.SetResult(input.Value);
                                        //file.OnChange = async e => task.SetResult(await FileRead(file));
                                        //string parseString = Global.Atob(await task.Task);
                                        //start.Style.Display = Display.None;
                                        //Level game = await Level.Create(JSON.Parse(parseString));
                                        //game.Canvas.Style.Border = "1px solid black";
                                        //Document.Body.AppendChild(game.Canvas);
                                        //game.Start();
                                        return;
                                    }
                                    default: {
                                        return;
                                    }
                                }
                            }
                        }, arguments);

                    $asyncBody();
                }
            }
        }
    });

    Bridge.ns("AndresFour.MainStarter", $asm.$);

    Bridge.apply($asm.$.AndresFour.MainStarter, {
        f1: function (e) {
        AndresFour.MainStarter.Start();
    },
        f2: function (e) {
        AndresFour.LevelEditor.Start();
    }
    });

    Bridge.define("AndresFour.Rectangle", {
        $kind: "struct",
        statics: {
            methods: {
                op_Addition: function (a, b) {
                    var $t;
                    return ($t=new AndresFour.Rectangle(), $t.X = a.X + b.X, $t.Y = a.Y + b.Y, $t.Width = a.Width, $t.Height = a.Height, $t);
                },
                getDefaultValue: function () { return new AndresFour.Rectangle(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            _width: 0,
            _height: 0
        },
        props: {
            Width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    if (value < 0) {
                        this.X -= value;
                        value = -value;
                    }
                    this._width = value;
                }
            },
            Height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    if (value < 0) {
                        this.Y -= value;
                        value = -value;
                    }
                    this._height = value;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            Contains: function (value) {
                return ((((this.X <= value.X) && (value.X < (this.X + this.Width))) && (this.Y <= value.Y)) && (value.Y < (this.Y + this.Height)));
            },
            /**
             * Gets whether or not the other {@link } intersects with this rectangle.
             *
             * @instance
             * @public
             * @this AndresFour.Rectangle
             * @memberof AndresFour.Rectangle
             * @param   {AndresFour.Rectangle}    value    The other rectangle for testing.
             * @return  {boolean}                          <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise.
             */
            Intersects: function (value) {
                return value.X < this.X + this.Width && this.X < value.X + value.Width && value.Y < this.Y + this.Height && this.Y < value.Y + value.Height;
            },
            getHashCode: function () {
                var h = Bridge.addHash([3771388952, this.X, this.Y, this._width, this._height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, AndresFour.Rectangle)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this._width, o._width) && Bridge.equals(this._height, o._height);
            },
            $clone: function (to) {
                var s = to || new AndresFour.Rectangle();
                s.X = this.X;
                s.Y = this.Y;
                s._width = this._width;
                s._height = this._height;
                return s;
            }
        }
    });

    Bridge.define("AndresFour.Vector2", {
        $kind: "struct",
        statics: {
            methods: {
                op_Multiply: function (a, b) {
                    var $t;
                    return ($t=new AndresFour.Vector2(), $t.X = a.X * b, $t.Y = a.Y * b, $t);
                },
                op_Addition: function (a, b) {
                    var $t;
                    return ($t=new AndresFour.Vector2(), $t.X = a.X + b.X, $t.Y = a.Y + b.Y, $t);
                },
                getDefaultValue: function () { return new AndresFour.Vector2(); }
            }
        },
        fields: {
            X: 0,
            Y: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1955977157, this.X, this.Y]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, AndresFour.Vector2)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y);
            },
            $clone: function (to) {
                var s = to || new AndresFour.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("AndresFour.DrawnGameObject", {
        inherits: [AndresFour.GameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "drawn game object";
                }
            }
        },
        fields: {
            Selected: false,
            Position: null,
            Image: null
        },
        props: {
            X: {
                get: function () {
                    return this.Position.X;
                },
                set: function (value) {
                    this.Position.X = value;
                }
            },
            Y: {
                get: function () {
                    return this.Position.Y;
                },
                set: function (value) {
                    this.Position.Y = value;
                }
            },
            Width: {
                get: function () {
                    return this.Position.Width;
                },
                set: function (value) {
                    this.Position.Width = value;
                }
            },
            Height: {
                get: function () {
                    return this.Position.Height;
                },
                set: function (value) {
                    this.Position.Height = value;
                }
            }
        },
        ctors: {
            init: function () {
                this.Position = new AndresFour.Rectangle();
            }
        },
        methods: {
            Save: function (dynamic) {
                dynamic.x = this.X;
                dynamic.y = this.Y;
                dynamic.width = this.Width;
                dynamic.height = this.Height; /// 'is' expression's given expression is never of the provided type


                if (Bridge.is(this.Image, HTMLImageElement)) {
                    dynamic.image = this.Image.src;
                } else {
                    dynamic.image = this.Image;
                }
                AndresFour.GameObject.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    imageString, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        this.X = dynamic.x;
                                        this.Y = dynamic.y;
                                        this.Width = dynamic.width;
                                        this.Height = dynamic.height;
                                        imageString = dynamic.image;
                                        if (imageString.charCodeAt(0) === 35) {
                                            $step = 1;
                                            continue;
                                        } else  {
                                            $step = 2;
                                            continue;
                                        }
                                    }
                                    case 1: {
                                        this.Image = imageString;
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = AndresFour.BridgeEssentials.LoadImage(imageString);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.Image = $taskResult1;
                                        $step = 4;
                                        continue;
                                    }
                                    case 4: {
                                        $task2 = AndresFour.GameObject.prototype.Parse.call(this, dynamic);
                                        $step = 5;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.define("AndresFour.Level", {
        inherits: [AndresFour.GameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "level";
                }
            }
        },
        fields: {
            Children: null,
            Interval: 0,
            DrawInterval: 0,
            Canvas: null,
            Down: null,
            Width: 0,
            Height: 0
        },
        methods: {
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $t, 
                    $t1, 
                    item, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        this.Children = new (System.Collections.Generic.List$1(AndresFour.GameObject))();
                                        this.Interval = dynamic.interval;
                                        this.DrawInterval = dynamic.drawInterval;
                                        this.Canvas = ($t=document.createElement('canvas'), $t.width = Bridge.Int.clip32((this.Width = dynamic.width)), $t.height = Bridge.Int.clip32((this.Height = dynamic.height)), $t);
                                        this.Down = new (System.Collections.Generic.HashSet$1(System.Int32)).ctor();
                                        $t1 = Bridge.getEnumerator(Bridge.cast(dynamic.children, System.Array.type(System.Object)));
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ($t1.moveNext()) {
                                            item = $t1.Current;
                                            $step = 2;
                                            continue;
                                        }
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = AndresFour.GameObject.Create(item);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.Children.add($taskResult1);
                                        $step = 1;
                                        continue;
                                    }
                                    case 4: {
                                        $task2 = AndresFour.GameObject.prototype.Parse.call(this, dynamic);
                                        $step = 5;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            },
            Start: function () {
                document.body.onkeyup = Bridge.fn.bind(this, $asm.$.AndresFour.Level.f1);
                document.body.onkeydown = Bridge.fn.bind(this, $asm.$.AndresFour.Level.f2);
                Bridge.global.setInterval(Bridge.fn.cacheBind(this, this.Update$1), this.Interval);
                Bridge.global.setInterval(Bridge.fn.cacheBind(this, this.Draw), this.DrawInterval);
            },
            Save: function (dynamic) {
                dynamic.width = this.Canvas.width;
                dynamic.height = this.Canvas.height;
                dynamic.interval = this.Interval;
                dynamic.drawInterval = this.DrawInterval;
                dynamic.children = this.Children.convertAll(System.Object, $asm.$.AndresFour.Level.f3).toArray();
                AndresFour.GameObject.prototype.Save.call(this, dynamic);
            },
            Draw: function () {
                var $t;
                var context = this.Canvas.getContext("2d");
                context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, AndresFour.DrawnGameObject)) {
                            var drawObject = child; /// 'is' expression's given expression is never of the provided type


                            if (Bridge.is(drawObject.Image, System.String)) {
                                context.fillStyle = drawObject.Image;
                                context.fillRect(drawObject.X, drawObject.Y, drawObject.Width, drawObject.Height);
                            } else {
                                context.drawImage(drawObject.Image, drawObject.X, drawObject.Y, drawObject.Width, drawObject.Height);
                            }
                            if (drawObject.Selected) {
                                context.strokeStyle = "#4286f4";
                                context.strokeRect(((Bridge.Int.clip32(drawObject.X) - 1) | 0), ((Bridge.Int.clip32(drawObject.Y) - 1) | 0), ((Bridge.Int.clip32(drawObject.Width) + 2) | 0), ((Bridge.Int.clip32(drawObject.Height) + 2) | 0));
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Update$1: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.Update(this);
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.ns("AndresFour.Level", $asm.$);

    Bridge.apply($asm.$.AndresFour.Level, {
        f1: function (e) {
            this.Down.remove(e.keyCode);
        },
        f2: function (e) {
            this.Down.add(e.keyCode);
        },
        f3: function (v) {
            return v.toDynamic();
        }
    });

    Bridge.define("AndresFour.OnKeyEvent", {
        inherits: [AndresFour.GameObject],
        fields: {
            WasLastFrame: false,
            Keys: null
        },
        ctors: {
            init: function () {
                this.WasLastFrame = false;
            }
        },
        methods: {
            Save: function (dynamic) {
                dynamic.keys = this.Keys.toArray();
                AndresFour.GameObject.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                this.Keys = new (System.Collections.Generic.List$1(System.Int32))(Bridge.cast(dynamic.keys, System.Array.type(System.Int32)));
                return AndresFour.GameObject.prototype.Parse.call(this, dynamic);
            }
        }
    });

    Bridge.define("AndresFour.RealGameObject", {
        inherits: [AndresFour.DrawnGameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "real game object";
                }
            }
        },
        fields: {
            Gravity: 0,
            Strength: 0,
            Velocity: null,
            lastIntersects: null,
            onSolid: false
        },
        ctors: {
            init: function () {
                this.Velocity = new AndresFour.Vector2();
                this.Strength = 5;
            }
        },
        methods: {
            Save: function (dynamic) {
                dynamic.gravity = this.Gravity;
                dynamic.strength = this.Strength;
                AndresFour.DrawnGameObject.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                this.Gravity = dynamic.gravity;
                this.Strength = dynamic.strength;
                return AndresFour.DrawnGameObject.prototype.Parse.call(this, dynamic);
            },
            TryMove$1: function ($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, Velocity, GetMovingIn, GetMovingInLength) {
                var $t, $t1, $t2;
                if (Velocity < 0) {
                    return this.TryMoveNegative($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, -Velocity, GetMovingIn, GetMovingInLength);
                }
                this.lastIntersects = new (System.Collections.Generic.List$1(AndresFour.RealGameObject))();
                $t = Bridge.getEnumerator($in.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, AndresFour.RealGameObject)) {
                            var realGameObject = child;
                            var rect = ($t1=new AndresFour.Rectangle(), $t1.X = NotMovingIn, $t1.Width = NotMovingInLength, $t1.Y = MovingIn.v + MovingInLength, $t1.Height = Velocity, $t1);
                            if (GetMovingIn(rect.$clone()) === rect.X && GetMovingInLength(rect.$clone()) === rect.Width) {
                                var newX = rect.Y;
                                var newY = rect.X;
                                var newWidth = rect.Height;
                                var newHeight = rect.Width;
                                rect = ($t2=new AndresFour.Rectangle(), $t2.X = newX, $t2.Y = newY, $t2.Width = newWidth, $t2.Height = newHeight, $t2);
                            }
                            var doesIntersect = rect.Intersects(realGameObject.Position.$clone());
                            if (doesIntersect) {
                                this.lastIntersects.add(realGameObject);
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }if (this.lastIntersects.Count === 0) {
                    MovingIn.v += Velocity;
                } else {
                    var min = System.Linq.Enumerable.from(this.lastIntersects).min(function (v) {
                            return GetMovingIn(v.Position.$clone()) - MovingInLength;
                        });
                    MovingIn.v = min;
                    return false;
                }
                return true;
            },
            TryMove: function ($in, velocity) {
                var $t, $t1;
                if (velocity.X !== 0 && velocity.Y !== 0) {
                    var canMove = true;
                    canMove = this.TryMove($in, ($t=new AndresFour.Vector2(), $t.X = velocity.X, $t)) ? canMove : false;
                    canMove = this.TryMove($in, ($t1=new AndresFour.Vector2(), $t1.Y = velocity.Y, $t1)) ? canMove : false;
                    return canMove;
                }
                if (velocity.X !== 0) {
                    return this.TryMove$1($in, this.Position.Y, Bridge.ref(this.Position, "X"), this.Position.Height, this.Position.Width, velocity.X, $asm.$.AndresFour.RealGameObject.f1, $asm.$.AndresFour.RealGameObject.f2);
                }
                if (velocity.Y !== 0) {
                    return this.TryMove$1($in, this.Position.X, Bridge.ref(this.Position, "Y"), this.Position.Width, this.Position.Height, velocity.Y, $asm.$.AndresFour.RealGameObject.f3, $asm.$.AndresFour.RealGameObject.f4);
                }
                return true;
            },
            TryMoveNegative: function ($in, NotMovingIn, MovingIn, NotMovingInLength, MovingInLength, Velocity, GetMovingIn, GetMovingInLength) {
                var $t, $t1, $t2;
                this.lastIntersects = new (System.Collections.Generic.List$1(AndresFour.RealGameObject))();
                $t = Bridge.getEnumerator($in.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        if (Bridge.is(child, AndresFour.RealGameObject)) {
                            var realGameObject = child;
                            var rect = ($t1=new AndresFour.Rectangle(), $t1.X = NotMovingIn, $t1.Width = NotMovingInLength, $t1.Y = MovingIn.v - Velocity, $t1.Height = Velocity, $t1);
                            if (GetMovingIn(rect.$clone()) === rect.X && GetMovingInLength(rect.$clone()) === rect.Width) {
                                var newX = rect.Y;
                                var newY = rect.X;
                                var newWidth = rect.Height;
                                var newHeight = rect.Width;
                                rect = ($t2=new AndresFour.Rectangle(), $t2.X = newX, $t2.Y = newY, $t2.Width = newWidth, $t2.Height = newHeight, $t2);
                            }
                            var doesIntersect = rect.Intersects(realGameObject.Position.$clone());
                            if (doesIntersect) {
                                this.lastIntersects.add(realGameObject);
                            }
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }if (this.lastIntersects.Count === 0) {
                    MovingIn.v -= Velocity;
                } else {
                    var max = System.Linq.Enumerable.from(this.lastIntersects).max(function (v) {
                            return GetMovingIn(v.Position.$clone()) + GetMovingInLength(v.Position.$clone());
                        });
                    MovingIn.v = max;
                    return false;
                }
                return true;
            },
            Update: function ($in) {
                var $t, $t1;
                if (!this.TryMove($in, (this.Velocity = AndresFour.Vector2.op_Multiply(this.Velocity.$clone(), 0.99)).$clone())) {
                    ($t = (Bridge.as(this, AndresFour.Shot))) != null ? $t.Corrode($in) : null;
                }
                this.onSolid = !this.TryMove($in, ($t1=new AndresFour.Vector2(), $t1.Y = this.Gravity, $t1));
            }
        }
    });

    Bridge.ns("AndresFour.RealGameObject", $asm.$);

    Bridge.apply($asm.$.AndresFour.RealGameObject, {
        f1: function (v) {
            return v.X;
        },
        f2: function (v) {
            return v.Width;
        },
        f3: function (v) {
            return v.Y;
        },
        f4: function (v) {
            return v.Height;
        }
    });

    Bridge.define("AndresFour.Movement", {
        inherits: [AndresFour.OnKeyEvent],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "movement";
                }
            }
        },
        fields: {
            Velocity: null,
            VelocityBased: false
        },
        ctors: {
            init: function () {
                this.Velocity = new AndresFour.Vector2();
            }
        },
        methods: {
            Save: function (dynamic) {
                dynamic.x = this.Velocity.X;
                dynamic.y = this.Velocity.Y;
                dynamic.velox = this.VelocityBased;
                AndresFour.OnKeyEvent.prototype.Save.call(this, dynamic);
            },
            Parse: function (dynamic) {
                this.Velocity.X = dynamic.x;
                this.Velocity.Y = dynamic.y;
                this.VelocityBased = dynamic.velox;
                return AndresFour.OnKeyEvent.prototype.Parse.call(this, dynamic);
            }
        }
    });

    Bridge.define("AndresFour.Shoot_OnKey", {
        inherits: [AndresFour.OnKeyEvent],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "shoot on key";
                }
            }
        },
        fields: {
            CreateShot: null
        },
        methods: {
            Parse: function (dynamic) {
                this.CreateShot = dynamic.shot;
                return AndresFour.OnKeyEvent.prototype.Parse.call(this, dynamic);
            },
            Save: function (dynamic) {
                dynamic.shot = this.CreateShot;
                AndresFour.OnKeyEvent.prototype.Save.call(this, dynamic);
            }
        }
    });

    Bridge.define("AndresFour.Character", {
        inherits: [AndresFour.RealGameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "character";
                }
            }
        },
        fields: {
            keyEvents: null
        },
        methods: {
            Save: function (dynamic) {
                dynamic.keyEvents = this.keyEvents.convertAll(System.Object, $asm.$.AndresFour.Character.f1).toArray();
                AndresFour.RealGameObject.prototype.Save.call(this, dynamic);
            },
            Update: function ($in) {
                var $t, $t1, $t2, $t3;
                AndresFour.RealGameObject.prototype.Update.call(this, $in);
                $t = Bridge.getEnumerator(this.keyEvents);
                try {
                    while ($t.moveNext()) {
                        $t1 = (function () {
                            var keyEvent = $t.Current;
                            if (System.Linq.Enumerable.from(keyEvent.Keys).all(function (key) {
                                    return $in.Down.contains(key);
                                })) {
                                if (Bridge.is(keyEvent, AndresFour.Movement)) {
                                    var movement = keyEvent;
                                    if (this.onSolid) {
                                        if (movement.VelocityBased) {
                                            this.Velocity = AndresFour.Vector2.op_Addition(this.Velocity.$clone(), movement.Velocity.$clone());
                                        } else {
                                            this.TryMove($in, movement.Velocity.$clone());
                                        }
                                        keyEvent.WasLastFrame = true;
                                        return {jump:2};
                                    }
                                } else if (Bridge.is(keyEvent, AndresFour.Shoot_OnKey) && !keyEvent.WasLastFrame) {
                                    var shoot = keyEvent;
                                    //shoot.CreateShot.x = X + Width / 2 - ((double)shoot.CreateShot.width) / 2;
                                    //shoot.CreateShot.y = Y + Height / 2 - ((double)shoot.CreateShot.height) / 2;
                                    var compareX = Bridge.compare(Bridge.cast(shoot.CreateShot.vX, System.Double), 0);
                                    var compareY = Bridge.compare(Bridge.cast(shoot.CreateShot.vY, System.Double), 0);
                                    var position = AndresFour.Vector2.op_Addition(($t2=new AndresFour.Vector2(), $t2.X = compareX * this.Width - (compareX === -1 ? shoot.CreateShot.width : 0), $t2.Y = compareY * this.Height - (compareY === -1 ? shoot.CreateShot.width : 0), $t2), ($t3=new AndresFour.Vector2(), $t3.X = this.X, $t3.Y = this.Y, $t3));
                                    shoot.CreateShot.x = position.X;
                                    shoot.CreateShot.y = position.Y;
                                    var created = AndresFour.GameObject.Create(shoot.CreateShot);
                                    created.continueWith(function (val) {
                                        $in.Children.add(val.getResult());
                                    });
                                    keyEvent.WasLastFrame = true;
                                    return {jump:2};
                                }
                                keyEvent.WasLastFrame = true;
                            } else {
                                keyEvent.WasLastFrame = false;
                            }
                        }).call(this) || {};
                        if($t1.jump == 2) break;
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Parse: function (dynamic) {
                var $step = 0,
                    $task1, 
                    $taskResult1, 
                    $task2, 
                    $jumpFromFinally, 
                    $tcs = new System.Threading.Tasks.TaskCompletionSource(), 
                    $returnValue, 
                    $t, 
                    keyEventDynamic, 
                    $async_e, 
                    $asyncBody = Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                $step = System.Array.min([0,1,2,3,4,5], $step);
                                switch ($step) {
                                    case 0: {
                                        this.keyEvents = new (System.Collections.Generic.List$1(AndresFour.OnKeyEvent))();
                                        $t = Bridge.getEnumerator(dynamic.keyEvents);
                                        $step = 1;
                                        continue;
                                    }
                                    case 1: {
                                        if ($t.moveNext()) {
                                            keyEventDynamic = $t.Current;
                                            $step = 2;
                                            continue;
                                        }
                                        $step = 4;
                                        continue;
                                    }
                                    case 2: {
                                        $task1 = AndresFour.GameObject.Create(keyEventDynamic);
                                        $step = 3;
                                        $task1.continueWith($asyncBody);
                                        return;
                                    }
                                    case 3: {
                                        $taskResult1 = $task1.getAwaitedResult();
                                        this.keyEvents.add($taskResult1);
                                        $step = 1;
                                        continue;
                                    }
                                    case 4: {
                                        $task2 = AndresFour.RealGameObject.prototype.Parse.call(this, dynamic);
                                        $step = 5;
                                        $task2.continueWith($asyncBody);
                                        return;
                                    }
                                    case 5: {
                                        $task2.getAwaitedResult();
                                        $tcs.setResult(null);
                                        return;
                                    }
                                    default: {
                                        $tcs.setResult(null);
                                        return;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            $tcs.setException($async_e);
                        }
                    }, arguments);

                $asyncBody();
                return $tcs.task;
            }
        }
    });

    Bridge.ns("AndresFour.Character", $asm.$);

    Bridge.apply($asm.$.AndresFour.Character, {
        f1: function (v) {
            return v.toDynamic();
        }
    });

    Bridge.define("AndresFour.Shot", {
        inherits: [AndresFour.RealGameObject],
        statics: {
            fields: {
                Type: null
            },
            ctors: {
                init: function () {
                    this.Type = "shot";
                }
            }
        },
        fields: {
            Corrosivity: 0
        },
        methods: {
            Parse: function (dynamic) {
                var $t;
                this.Velocity = AndresFour.Vector2.op_Addition(this.Velocity.$clone(), ($t=new AndresFour.Vector2(), $t.X = dynamic.vX, $t.Y = dynamic.vY, $t));
                this.Corrosivity = dynamic.corrosivity;
                return AndresFour.RealGameObject.prototype.Parse.call(this, dynamic);
            },
            Save: function (dynamic) {
                dynamic.vX = this.X;
                dynamic.vY = this.Y;
                dynamic.corrosivity = this.Corrosivity;
                AndresFour.RealGameObject.prototype.Save.call(this, dynamic);
            },
            Corrode: function ($in) {
                var $t;
                $t = Bridge.getEnumerator(this.lastIntersects);
                try {
                    while ($t.moveNext()) {
                        var intersect = $t.Current;
                        if (intersect.Strength <= this.Corrosivity) {
                            $in.Children.remove(intersect);
                        }
                    }
                }finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Update: function ($in) {
                var $t, $t1;
                if (!(($t=new AndresFour.Rectangle(), $t.X = 0, $t.Y = 0, $t.Width = $in.Width, $t.Height = $in.Height, $t).Contains(($t1=new AndresFour.Vector2(), $t1.X = this.Position.X, $t1.Y = this.Position.Y, $t1)))) {
                    $in.Children.remove(this);
                }
                AndresFour.RealGameObject.prototype.Update.call(this, $in);
            }
        }
    });

    var $box_ = {};

    Bridge.ns("System.Double", $box_);

    Bridge.apply($box_.System.Double, {
        toString: function (obj) {return System.Double.format(obj, 'G');}
    });

    var $m = Bridge.setMetadata,
        $n = [System.Collections.Generic,AndresFour,System.Threading.Tasks,System];
    $m($n[1].LevelEditorReference, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"cells","t":4,"rt":$n[0].Dictionary$2(System.String,HTMLElement),"sn":"cells"},{"a":2,"n":"gameObject","t":4,"rt":$n[1].GameObject,"sn":"gameObject"},{"a":2,"n":"members","t":4,"rt":$n[0].Dictionary$2(System.String,System.Object),"sn":"members"}]}; });
    $m($n[1].MainStarter, function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":1,"n":"FileRead","is":true,"t":8,"pi":[{"n":"fileInput","pt":HTMLInputElement,"ps":0}],"sn":"FileRead","rt":$n[2].Task$1,"p":[HTMLInputElement]},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[3].Object},{"a":2,"n":"Start","is":true,"t":8,"sn":"Start","rt":$n[3].Object},{"a":2,"n":"BackgroundImage","is":true,"t":4,"rt":$n[3].String,"sn":"BackgroundImage"},{"a":2,"n":"FileVersion","is":true,"t":4,"rt":$n[3].Int32,"sn":"FileVersion"},{"a":2,"n":"levelTemplate","is":true,"t":4,"rt":System.Object,"sn":"levelTemplate"}]}; });
    $m($n[1].Character, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0}],"sn":"Update","rt":$n[3].Object,"p":[$n[1].Level]},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"},{"a":2,"n":"keyEvents","t":4,"rt":$n[0].List$1(AndresFour.OnKeyEvent),"sn":"keyEvents"}]}; });
    $m($n[1].DrawnGameObject, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"Height","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_Height","t":8,"rt":$n[3].Double,"fg":"Height"},"s":{"a":2,"n":"set_Height","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"Height"},"fn":"Height"},{"a":2,"n":"Width","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_Width","t":8,"rt":$n[3].Double,"fg":"Width"},"s":{"a":2,"n":"set_Width","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"Width"},"fn":"Width"},{"a":2,"n":"X","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_X","t":8,"rt":$n[3].Double,"fg":"X"},"s":{"a":2,"n":"set_X","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"X"},"fn":"X"},{"a":2,"n":"Y","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_Y","t":8,"rt":$n[3].Double,"fg":"Y"},"s":{"a":2,"n":"set_Y","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"Y"},"fn":"Y"},{"a":2,"n":"Image","t":4,"rt":System.Object,"sn":"Image"},{"a":2,"n":"Position","t":4,"rt":$n[1].Rectangle,"sn":"Position"},{"a":4,"n":"Selected","t":4,"rt":$n[3].Boolean,"sn":"Selected"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"}]}; });
    $m($n[1].Level, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Draw","t":8,"sn":"Draw","rt":$n[3].Object},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"Start","t":8,"sn":"Start","rt":$n[3].Object},{"a":2,"n":"Update","t":8,"sn":"Update$1","rt":$n[3].Object},{"a":2,"n":"Canvas","t":4,"rt":HTMLCanvasElement,"sn":"Canvas"},{"a":2,"n":"Children","t":4,"rt":$n[0].List$1(AndresFour.GameObject),"sn":"Children"},{"a":2,"n":"Down","t":4,"rt":$n[0].HashSet$1(System.Int32),"sn":"Down"},{"a":2,"n":"DrawInterval","t":4,"rt":$n[3].Int32,"sn":"DrawInterval"},{"a":2,"n":"Height","t":4,"rt":$n[3].Double,"sn":"Height"},{"a":2,"n":"Interval","t":4,"rt":$n[3].Int32,"sn":"Interval"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"},{"a":2,"n":"Width","t":4,"rt":$n[3].Double,"sn":"Width"}]}; });
    $m($n[1].GameObject, function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Create","is":true,"t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Create","rt":$n[2].Task$1,"p":[System.Object]},{"v":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"v":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"ov":true,"a":2,"n":"ToDynamic","t":8,"sn":"toDynamic","rt":System.Object},{"v":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0}],"sn":"Update","rt":$n[3].Object,"p":[$n[1].Level]},{"a":2,"n":"Name","t":4,"rt":$n[3].String,"sn":"Name"}]}; });
    $m($n[1].BridgeEssentials, function () { return {"att":1048961,"a":2,"s":true,"m":[{"a":2,"n":"LoadImage","is":true,"t":8,"pi":[{"n":"value","pt":$n[3].String,"ps":0}],"sn":"LoadImage","rt":$n[2].Task$1,"p":[$n[3].String]}]}; });
    $m($n[1].Movement, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"},{"a":2,"n":"Velocity","t":4,"rt":$n[1].Vector2,"sn":"Velocity"},{"a":2,"n":"VelocityBased","t":4,"rt":$n[3].Boolean,"sn":"VelocityBased"}]}; });
    $m($n[1].OnKeyEvent, function () { return {"att":1048705,"a":2,"m":[{"a":3,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"Keys","t":4,"rt":$n[0].List$1(System.Int32),"sn":"Keys"},{"a":2,"n":"WasLastFrame","t":4,"rt":$n[3].Boolean,"sn":"WasLastFrame"}]}; });
    $m($n[1].RealGameObject, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"TryMove","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0},{"n":"velocity","pt":$n[1].Vector2,"ps":1}],"sn":"TryMove","rt":$n[3].Boolean,"p":[$n[1].Level,$n[1].Vector2]},{"a":2,"n":"TryMove","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0},{"n":"NotMovingIn","pt":$n[3].Double,"ps":1},{"n":"MovingIn","ref":true,"pt":$n[3].Double,"ps":2},{"n":"NotMovingInLength","pt":$n[3].Double,"ps":3},{"n":"MovingInLength","pt":$n[3].Double,"ps":4},{"n":"Velocity","pt":$n[3].Double,"ps":5},{"n":"GetMovingIn","pt":Function,"ps":6},{"n":"GetMovingInLength","pt":Function,"ps":7}],"sn":"TryMove$1","rt":$n[3].Boolean,"p":[$n[1].Level,$n[3].Double,$n[3].Double,$n[3].Double,$n[3].Double,$n[3].Double,Function,Function]},{"a":2,"n":"TryMoveNegative","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0},{"n":"NotMovingIn","pt":$n[3].Double,"ps":1},{"n":"MovingIn","ref":true,"pt":$n[3].Double,"ps":2},{"n":"NotMovingInLength","pt":$n[3].Double,"ps":3},{"n":"MovingInLength","pt":$n[3].Double,"ps":4},{"n":"Velocity","pt":$n[3].Double,"ps":5},{"n":"GetMovingIn","pt":Function,"ps":6},{"n":"GetMovingInLength","pt":Function,"ps":7}],"sn":"TryMoveNegative","rt":$n[3].Boolean,"p":[$n[1].Level,$n[3].Double,$n[3].Double,$n[3].Double,$n[3].Double,$n[3].Double,Function,Function]},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0}],"sn":"Update","rt":$n[3].Object,"p":[$n[1].Level]},{"a":2,"n":"Gravity","t":4,"rt":$n[3].Double,"sn":"Gravity"},{"a":2,"n":"Strength","t":4,"rt":$n[3].Int32,"sn":"Strength"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"},{"a":2,"n":"Velocity","t":4,"rt":$n[1].Vector2,"sn":"Velocity"},{"a":2,"n":"lastIntersects","t":4,"rt":$n[0].List$1(AndresFour.RealGameObject),"sn":"lastIntersects"},{"a":4,"n":"onSolid","t":4,"rt":$n[3].Boolean,"sn":"onSolid"}]}; });
    $m($n[1].Rectangle, function () { return {"att":1048841,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Contains","t":8,"pi":[{"n":"value","pt":$n[1].Vector2,"ps":0}],"sn":"Contains","rt":$n[3].Boolean,"p":[$n[1].Vector2]},{"a":2,"n":"Intersects","t":8,"pi":[{"n":"value","pt":$n[1].Rectangle,"ps":0}],"sn":"Intersects","rt":$n[3].Boolean,"p":[$n[1].Rectangle]},{"a":2,"n":"op_Addition","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Rectangle,"ps":0},{"n":"b","pt":$n[1].Vector2,"ps":1}],"sn":"op_Addition","rt":$n[1].Rectangle,"p":[$n[1].Rectangle,$n[1].Vector2]},{"a":2,"n":"Height","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_Height","t":8,"rt":$n[3].Double,"fg":"Height"},"s":{"a":2,"n":"set_Height","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"Height"},"fn":"Height"},{"a":2,"n":"Width","t":16,"rt":$n[3].Double,"g":{"a":2,"n":"get_Width","t":8,"rt":$n[3].Double,"fg":"Width"},"s":{"a":2,"n":"set_Width","t":8,"p":[$n[3].Double],"rt":$n[3].Object,"fs":"Width"},"fn":"Width"},{"a":2,"n":"X","t":4,"rt":$n[3].Double,"sn":"X"},{"a":2,"n":"Y","t":4,"rt":$n[3].Double,"sn":"Y"},{"a":1,"n":"_height","t":4,"rt":$n[3].Double,"sn":"_height"},{"a":1,"n":"_width","t":4,"rt":$n[3].Double,"sn":"_width"}]}; });
    $m($n[1].Shoot_OnKey, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"a":2,"n":"CreateShot","t":4,"rt":System.Object,"sn":"CreateShot"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"}]}; });
    $m($n[1].Shot, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Corrode","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0}],"sn":"Corrode","rt":$n[3].Object,"p":[$n[1].Level]},{"ov":true,"a":2,"n":"Parse","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Parse","rt":$n[2].Task,"p":[System.Object]},{"ov":true,"a":2,"n":"Save","t":8,"pi":[{"n":"dynamic","pt":System.Object,"ps":0}],"sn":"Save","rt":$n[3].Object,"p":[System.Object]},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"in","pt":$n[1].Level,"ps":0}],"sn":"Update","rt":$n[3].Object,"p":[$n[1].Level]},{"a":2,"n":"Corrosivity","t":4,"rt":$n[3].Int32,"sn":"Corrosivity"},{"a":2,"n":"Type","is":true,"t":4,"rt":$n[3].String,"sn":"Type"}]}; });
    $m($n[1].Vector2, function () { return {"att":1048841,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"op_Addition","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Vector2,"ps":0},{"n":"b","pt":$n[1].Vector2,"ps":1}],"sn":"op_Addition","rt":$n[1].Vector2,"p":[$n[1].Vector2,$n[1].Vector2]},{"a":2,"n":"op_Multiply","is":true,"t":8,"pi":[{"n":"a","pt":$n[1].Vector2,"ps":0},{"n":"b","pt":$n[3].Double,"ps":1}],"sn":"op_Multiply","rt":$n[1].Vector2,"p":[$n[1].Vector2,$n[3].Double]},{"a":2,"n":"X","t":4,"rt":$n[3].Double,"sn":"X"},{"a":2,"n":"Y","t":4,"rt":$n[3].Double,"sn":"Y"}]}; });
});
