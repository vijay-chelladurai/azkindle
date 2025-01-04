using System;
using System.Collections.Generic;

namespace azkindle.api.dbAccess;

public partial class TblOrder
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public long UserId { get; set; }

    public DateTime DateOfOrder { get; set; }

    public virtual TblBook Book { get; set; }

    public virtual TblUser User { get; set; }
}
