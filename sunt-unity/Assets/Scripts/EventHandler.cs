using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;

public class EventHandler : MonoBehaviour {

	[DllImport ("__Internal")]    private static extern void RequestProject (string project);

	public static void switchProject(string project) {
		RequestProject (project);
	}
}
