using System;
using System.Collections.Generic;

namespace azkindle.api.dbAccess;

public partial class TblBook
{
    public int Id { get; set; }

    public string BookName { get; set; }

    public int Stock { get; set; }

    public string Author { get; set; }

    public decimal Price { get; set; }

    public byte[] Image { get; set; }

    public virtual ICollection<TblOrder> TblOrders { get; set; } = new List<TblOrder>();
}
